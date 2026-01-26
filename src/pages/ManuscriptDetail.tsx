import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChapterList } from "@/components/library/ChapterList";
import { ChapterReader } from "@/components/library/ChapterReader";
import { getManuscriptById } from "@/config/manuscripts";
import { useReadingProgress } from "@/hooks/use-reading-progress";

export default function ManuscriptDetail() {
  const { manuscriptId } = useParams<{ manuscriptId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const manuscript = manuscriptId ? getManuscriptById(manuscriptId) : undefined;
  const { markChapterRead, isChapterRead, getReadCount, lastChapterId } =
    useReadingProgress(manuscriptId || "");

  const [activeChapterId, setActiveChapterId] = useState<string>("");

  // Set initial chapter from URL param, last read, or first chapter
  useEffect(() => {
    if (manuscript && !activeChapterId) {
      const chapterFromUrl = searchParams.get('chapter');
      const initialChapter = chapterFromUrl || lastChapterId || manuscript.chapters[0]?.id;
      if (initialChapter) {
        setActiveChapterId(initialChapter);
      }
    }
  }, [manuscript, activeChapterId, lastChapterId, searchParams]);

  if (!manuscript) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Manuscript not found</p>
          <Button onClick={() => navigate("/library")}>
            Return to Library
          </Button>
        </div>
      </div>
    );
  }

  const activeChapter = manuscript.chapters.find(
    (c) => c.id === activeChapterId
  );
  const activeChapterIndex = manuscript.chapters.findIndex(
    (c) => c.id === activeChapterId
  );

  const progressPercent = Math.round(
    (getReadCount() / manuscript.chapters.length) * 100
  );

  const handleChapterSelect = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setSidebarOpen(false);
  };

  const handlePrevious = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterId(manuscript.chapters[activeChapterIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeChapterIndex < manuscript.chapters.length - 1) {
      setActiveChapterId(manuscript.chapters[activeChapterIndex + 1].id);
    }
  };

  const handleMarkRead = () => {
    if (activeChapterId) {
      markChapterRead(activeChapterId);
    }
  };

  const ChapterSidebar = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/30">
        <h3 className="font-display font-bold text-lg">{manuscript.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {manuscript.chapters.length} chapters
        </p>
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-accent">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChapterList
          chapters={manuscript.chapters}
          activeChapterId={activeChapterId}
          onChapterSelect={handleChapterSelect}
          isChapterRead={isChapterRead}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/30">
        <div className="container flex items-center gap-3 h-14 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/library")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-sm truncate">
              {manuscript.title}
            </h1>
            {activeChapter && (
              <p className="text-xs text-muted-foreground truncate">
                Chapter {activeChapter.number}: {activeChapter.title}
              </p>
            )}
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              {ChapterSidebar}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-20 h-[calc(100vh-6rem)] rounded-lg border border-border/30 bg-card/30 overflow-hidden">
              {ChapterSidebar}
            </div>
          </aside>

          {/* Reader */}
          <main className="flex-1 min-w-0">
            <div className="bg-card/30 border border-border/30 rounded-lg p-6 min-h-[calc(100vh-10rem)]">
              {activeChapter ? (
                <ChapterReader
                  chapter={activeChapter}
                  totalChapters={manuscript.chapters.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  hasPrevious={activeChapterIndex > 0}
                  hasNext={activeChapterIndex < manuscript.chapters.length - 1}
                  isRead={isChapterRead(activeChapterId)}
                  onMarkRead={handleMarkRead}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mr-3" />
                  <span>Select a chapter to begin reading</span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
