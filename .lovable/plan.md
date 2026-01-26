

## AI-Powered Heritage Story Generation + Reading Progress Sharing

### Overview

This plan adds two features:
1. **AI Story Generation** - Replace the mock story generation with real AI-powered stories based on user-selected themes
2. **Reading Progress Sharing** - Add share buttons to the Reading Hub for manuscripts

---

### Feature 1: AI-Powered Heritage Story Generation

#### Current State
- Stories page uses `SAMPLE_STORIES` array with random selection
- Simulates generation with a 2-second delay
- No theme selection for personalization

#### Solution
Create an edge function that uses Lovable AI (Gemini) to generate heritage stories grounded in classical archery manuscripts. Users can select themes to personalize their story.

---

**Theme Options:**

| Theme | Description |
|-------|-------------|
| Battles & Warfare | Stories of archers in famous Islamic battles |
| Training & Discipline | Stories about mastering the art through practice |
| Wisdom & Teaching | Stories of masters passing knowledge to students |
| Hunting & Provision | Stories of archers providing for their communities |
| Competitions & Excellence | Stories of archery contests and champions |

---

**User Interface Changes:**

```
+--------------------------------------------------+
| 📖 Discover a Story                              |
+--------------------------------------------------+
| Choose a theme:                                  |
|                                                  |
| [Battles] [Training] [Wisdom] [Hunting] [Contests]|
|                                                  |
| [✨ Generate Story]                              |
+--------------------------------------------------+
```

---

**Edge Function: `generate-story`**

```typescript
// System prompt grounded in historical manuscripts
const systemPrompt = `You are a storyteller specializing in Islamic heritage, 
particularly the traditions of archery among the Sahaba and classical 
Islamic civilization. Generate stories that are:
- Historically grounded in classical texts like "Arab Archery" and "Saracen Archery"
- Inspiring and educational
- 200-300 words in length
- Based on the selected theme

Respond with JSON: { "title": "...", "content": "..." }`;
```

---

**Flow:**
1. User selects a theme (optional, defaults to random)
2. User clicks "Generate Story"
3. Frontend calls edge function with theme
4. Edge function calls Lovable AI Gateway
5. AI generates personalized story
6. Story displayed with save/share options

---

### Feature 2: Reading Progress Sharing

#### Current State
- Reading Hub (`/reading`) has no share functionality
- `ManuscriptProgressCard` and `ContinueReading` components display progress
- Share pattern already exists in Stories page

#### Solution
Add share buttons to both:
1. **ManuscriptProgressCard** - Share progress for any manuscript
2. **ContinueReading** - Share current reading status

---

**Share Message Format:**

```
📚 Reading Progress

I'm reading "Arab Archery" in the Minhuj Reading Hub!
Progress: 3/10 chapters (30%)
Currently on: Chapter 4 - The Stance
```

---

**UI Changes:**

```
ManuscriptProgressCard (after progress bar):
+------------------------------------------+
| Arab Archery                   [📤 Share] |
| 3/10 chapters • 30%                       |
| ████░░░░                                  |
+------------------------------------------+

ContinueReading (in card):
+------------------------------------------+
| Continue Reading                         |
| ─────────────────────────────────────── |
| Arab Archery                   [📤]      |
| Chapter 4: The Stance                    |
| 3/10 • 2 days ago                        |
+------------------------------------------+
```

---

### Implementation Files

| Action | File | Purpose |
|--------|------|---------|
| CREATE | `supabase/functions/generate-story/index.ts` | AI story generation endpoint |
| UPDATE | `supabase/config.toml` | Register new edge function |
| UPDATE | `src/pages/Stories.tsx` | Add theme selector, call edge function |
| UPDATE | `src/components/reading/ManuscriptProgressCard.tsx` | Add share button |
| UPDATE | `src/components/reading/ContinueReading.tsx` | Add share button |

---

### Technical Details

#### Edge Function Implementation

```typescript
// supabase/functions/generate-story/index.ts
const themes = {
  battles: "Stories of archers in famous Islamic battles (Badr, Uhud, etc.)",
  training: "Stories about mastering archery through discipline and practice",
  wisdom: "Stories of masters teaching students the deeper meaning of the art",
  hunting: "Stories of archers providing for their families and communities",
  competitions: "Stories of archery contests and achieving excellence"
};

// Call Lovable AI Gateway with theme-specific prompt
// Parse JSON response and return story
```

#### Frontend Theme Selector

```typescript
// New component in Stories.tsx
const THEMES = [
  { id: "battles", label: "Battles", icon: Swords },
  { id: "training", label: "Training", icon: Target },
  { id: "wisdom", label: "Wisdom", icon: BookOpen },
  { id: "hunting", label: "Hunting", icon: TreePine },
  { id: "competitions", label: "Contests", icon: Trophy },
] as const;

const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
```

#### Share Functions

```typescript
// In ManuscriptProgressCard and ContinueReading
const handleShareProgress = async () => {
  const shareText = `📚 Reading Progress\n\n` +
    `I'm reading "${manuscript.title}" in the Minhuj Reading Hub!\n` +
    `Progress: ${readCount}/${totalChapters} chapters (${progressPercent}%)\n` +
    (chapter ? `Currently on: Chapter ${chapter.number} - ${chapter.title}` : '');

  if (navigator.share) {
    await navigator.share({ title: "My Reading Progress", text: shareText });
  } else {
    await navigator.clipboard.writeText(shareText);
    toast({ title: "Copied!", description: "Progress copied to clipboard." });
  }
};
```

---

### Error Handling

- **Rate limits (429)**: Show "Please wait a moment and try again"
- **Credit limits (402)**: Show "AI credits depleted" message
- **Network errors**: Fallback to random sample story with note

---

### Summary

| Feature | Components Changed | New Files |
|---------|-------------------|-----------|
| AI Story Generation | `Stories.tsx` | `generate-story/index.ts` |
| Reading Progress Share | `ManuscriptProgressCard.tsx`, `ContinueReading.tsx` | None |

