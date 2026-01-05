import { useState } from "react";
import { BookOpen, Sparkles, Scroll, Star, Loader2, Bookmark, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSavedStories, SavedStory } from "@/hooks/use-saved-stories";

interface Story {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const SAMPLE_STORIES = [
  {
    title: "The Archer of Badr",
    content: "Sa'd ibn Abi Waqqas was among the first to embrace Islam and became one of the greatest archers in Islamic history. At the Battle of Badr, his arrows flew with precision guided by faith. The Prophet ﷺ said to him, 'Shoot, Sa'd! May my father and mother be sacrificed for you.' This honor was given to no other companion. His dedication to archery was matched only by his devotion to prayer, often spending nights in worship before battles."
  },
  {
    title: "The Legacy of Uqbah",
    content: "Uqbah ibn Amir al-Juhani was known for his exceptional skill with the bow. He narrated that the Prophet ﷺ said, 'Lands shall be opened for you, and Allah will suffice you, but none of you should neglect practicing with his arrows.' Uqbah took this teaching to heart, becoming not only a master archer but also a teacher who trained generations in the art. His arrows were said to never miss their mark."
  },
  {
    title: "The Bow of Hamza",
    content: "Hamza ibn Abdul-Muttalib, the Lion of Allah, was as skilled with the bow as he was with the sword. Before embracing Islam, he was renowned throughout Makkah for his hunting prowess. After his conversion, he channeled this skill in defense of the faith. At Uhud, his arrows protected the believers until his martyrdom, and his bow became a symbol of courage passed down through generations."
  }
];

export default function Stories() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const { toast } = useToast();
  const { 
    savedStories, 
    favorites, 
    saveStory, 
    removeStory, 
    toggleFavorite, 
    isStorySaved, 
    isStoryFavorited 
  } = useSavedStories();

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    
    // Simulate story generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomStory = SAMPLE_STORIES[Math.floor(Math.random() * SAMPLE_STORIES.length)];
    
    setCurrentStory({
      id: Date.now().toString(),
      title: randomStory.title,
      content: randomStory.content,
      createdAt: new Date()
    });
    
    setIsGenerating(false);
    
    toast({
      title: "Story Generated",
      description: `"${randomStory.title}" has been created for you.`
    });
  };

  const handleSaveStory = () => {
    if (!currentStory) return;
    
    if (isStorySaved(currentStory.id)) {
      removeStory(currentStory.id);
      toast({
        title: "Story Removed",
        description: "Story removed from your collection."
      });
    } else {
      saveStory(currentStory);
      toast({
        title: "Story Saved",
        description: "Story saved to your collection."
      });
    }
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    const isFavorited = isStoryFavorited(id);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited ? "Story removed from favorites." : "Story added to favorites."
    });
  };

  const handleDeleteStory = (id: string) => {
    removeStory(id);
    toast({
      title: "Story Deleted",
      description: "Story removed from your collection."
    });
  };

  const displayedStories = activeTab === "favorites" ? favorites : savedStories;

  return (
    <div className="animate-fade-in">
      <div className="container py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Heritage Stories
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover the rich history of Islamic archery
          </p>
        </div>

        {/* Generate Story Card */}
        <CornerFrame className="bg-card border border-border/50 p-6 md:p-8 lg:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
                Discover a Story
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
                Stories about the Sahaba and the rich tradition of Islamic archery through the ages
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8"
              onClick={handleGenerateStory}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Story
                </>
              )}
            </Button>
          </div>
        </CornerFrame>

        {/* Generated Story Display */}
        {currentStory && (
          <Card className="bg-card border-border/50 animate-fade-in">
            <CardContent className="p-6 md:p-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {currentStory.title}
                </h3>
                <div className="flex gap-1 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleToggleFavorite(currentStory.id)}
                    className={isStoryFavorited(currentStory.id) ? "text-primary" : "text-muted-foreground"}
                  >
                    <Star className={`h-5 w-5 ${isStoryFavorited(currentStory.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleSaveStory}
                    className={isStorySaved(currentStory.id) ? "text-primary" : "text-muted-foreground"}
                  >
                    <Bookmark className={`h-5 w-5 ${isStorySaved(currentStory.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed text-sm md:text-base">
                {currentStory.content}
              </p>
              <p className="text-xs text-muted-foreground">
                Generated {currentStory.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Saved Stories Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl md:text-2xl font-semibold">Saved Stories</h2>
            {savedStories.length > 0 && (
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "favorites")}>
                <TabsList className="h-9">
                  <TabsTrigger value="all" className="text-xs px-3">
                    All ({savedStories.length})
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="text-xs px-3">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    ({favorites.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
          
          {savedStories.length === 0 ? (
            <Card className="bg-card border-border/50">
              <CardContent className="py-8 md:py-12 text-center">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Scroll className="h-5 w-5" />
                      <span>No stories saved</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-5 w-5" />
                      <span>0 favorites</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Discover your first heritage story to learn from the masters
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : displayedStories.length === 0 ? (
            <Card className="bg-card border-border/50">
              <CardContent className="py-8 md:py-12 text-center">
                <div className="space-y-2">
                  <Star className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground text-sm md:text-base">
                    No favorite stories yet. Star a story to add it here.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {displayedStories.map((story) => (
                <SavedStoryCard
                  key={story.id}
                  story={story}
                  isExpanded={expandedStoryId === story.id}
                  onToggleExpand={() => setExpandedStoryId(expandedStoryId === story.id ? null : story.id)}
                  onToggleFavorite={() => handleToggleFavorite(story.id)}
                  onDelete={() => handleDeleteStory(story.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SavedStoryCardProps {
  story: SavedStory;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

function SavedStoryCard({ story, isExpanded, onToggleExpand, onToggleFavorite, onDelete }: SavedStoryCardProps) {
  const previewLength = 120;
  const needsTruncation = story.content.length > previewLength;
  const displayContent = isExpanded || !needsTruncation 
    ? story.content 
    : story.content.slice(0, previewLength) + "...";

  return (
    <Card className="bg-card border-border/50">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-6 w-6 ${story.isFavorite ? "text-primary" : "text-muted-foreground"}`}
                onClick={onToggleFavorite}
              >
                <Star className={`h-4 w-4 ${story.isFavorite ? "fill-current" : ""}`} />
              </Button>
              <h4 className="font-display font-semibold text-foreground truncate">
                {story.title}
              </h4>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-2">
              {displayContent}
            </p>
            <p className="text-xs text-muted-foreground">
              Saved {new Date(story.savedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {needsTruncation && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={onToggleExpand}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
