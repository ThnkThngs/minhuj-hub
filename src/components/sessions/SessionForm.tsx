import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CornerFrame } from "@/components/ui/corner-frame";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Target, Clock, ArrowUpRight } from "lucide-react";
import { type CreateSessionInput, type SessionMood } from "@/hooks/use-training-sessions";
import { techniques } from "@/config/library";

const moodOptions: { value: SessionMood; emoji: string; label: string }[] = [
  { value: "focused", emoji: "🎯", label: "Focused" },
  { value: "improving", emoji: "💪", label: "Improving" },
  { value: "energized", emoji: "⚡", label: "Energized" },
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "struggling", emoji: "😤", label: "Struggling" },
];

const durationPresets = [30, 45, 60, 90];

interface SessionFormProps {
  onSubmit: (data: CreateSessionInput) => Promise<void>;
  onCancel?: () => void;
}

export function SessionForm({ onSubmit, onCancel }: SessionFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(45);
  const [arrowsShot, setArrowsShot] = useState<number>(100);
  const [notes, setNotes] = useState("");
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [mood, setMood] = useState<SessionMood | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      session_date: format(date, "yyyy-MM-dd"),
      duration_minutes: duration,
      arrows_shot: arrowsShot,
      notes: notes || undefined,
      techniques_practiced: selectedTechniques,
      mood,
    });

    setIsSubmitting(false);
  };

  const toggleTechnique = (id: string) => {
    setSelectedTechniques((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <CornerFrame className="bg-card border border-border/50 p-5 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border/30">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Log Training Session</h3>
            <p className="text-sm text-muted-foreground">Record your archery practice</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <div className="flex gap-2">
              <div className="flex gap-1">
                {durationPresets.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={duration === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDuration(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-20"
                min={1}
              />
            </div>
          </div>

          {/* Arrows Shot */}
          <div className="space-y-2">
            <Label htmlFor="arrows">Arrows Shot</Label>
            <div className="relative">
              <ArrowUpRight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="arrows"
                type="number"
                value={arrowsShot}
                onChange={(e) => setArrowsShot(Number(e.target.value))}
                className="pl-10"
                min={0}
                placeholder="100"
              />
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-2">
            <Label>How did it feel?</Label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={mood === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood(mood === option.value ? undefined : option.value)}
                  className="gap-1"
                >
                  <span>{option.emoji}</span>
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Techniques Practiced */}
        <div className="space-y-2">
          <Label>Techniques Practiced (optional)</Label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 rounded-lg bg-secondary/30">
            {techniques.slice(0, 8).map((technique) => (
              <Button
                key={technique.id}
                type="button"
                variant={selectedTechniques.includes(technique.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTechnique(technique.id)}
                className="text-xs"
              >
                {technique.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did your session go? Any observations or goals..."
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-border/30">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Log Session
              </>
            )}
          </Button>
        </div>
      </form>
    </CornerFrame>
  );
}
