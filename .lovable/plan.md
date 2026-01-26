
## Improve Manuscript Reading Access

### Current State
The Library page displays manuscripts at the bottom in expandable cards. To read a full manuscript, users must:
1. Expand the manuscript card
2. Scroll to the bottom of the expanded content
3. Click the small "Open Full Manuscript Reader" button

This path to the full reader is not obvious.

---

### Solution

Add prominent "Read" buttons at multiple points to make manuscript access more intuitive:

1. **Add "Read" button to collapsed manuscript card header**
   - Small button visible even when card is collapsed
   - Provides direct access without needing to expand first

2. **Make the "Open Full Manuscript Reader" button more prominent**
   - Change from ghost variant to default/outline
   - Add a book icon for visual clarity
   - Use more prominent styling

3. **Add quick-access "Read Chapter" button to each chapter item**
   - Opens the full reader directly to that specific chapter
   - Makes chapter-specific navigation faster

---

### Visual Changes

**Collapsed Card (before):**
```
+------------------------------------------+
| [📜] Arab Archery              [▼]       |
|      A 15th Century Moroccan...          |
|      10 chapters                         |
+------------------------------------------+
```

**Collapsed Card (after):**
```
+------------------------------------------+
| [📜] Arab Archery      [📖 Read]  [▼]   |
|      A 15th Century Moroccan...          |
|      10 chapters                         |
+------------------------------------------+
```

**Footer Button (after):**
```
+------------------------------------------+
| [📖 Open Full Manuscript Reader →]       |
+------------------------------------------+
```
(Changed from ghost to outline style with book icon)

**Chapter Item (after):**
```
+------------------------------------------+
| [1] Introduction to Archery    [Read ▸]  |
|     مقدمة في فن الرماية                  |
+------------------------------------------+
```

---

### Files to Update

| File | Changes |
|------|---------|
| `src/components/library/ExpandableManuscriptCard.tsx` | Add "Read" button to header, enhance footer button styling |
| `src/components/library/ExpandableChapterItem.tsx` | Add "Read" button that navigates to reader at specific chapter |

---

### Technical Details

**ExpandableManuscriptCard.tsx changes:**

```typescript
// Add BookOpen icon import
import { BookOpen } from "lucide-react";

// In header, add Read button before chevron:
<Button
  variant="outline"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/library/manuscript/${manuscript.id}`);
  }}
  className="text-xs gap-1.5"
>
  <BookOpen className="h-3 w-3" />
  Read
</Button>

// Update footer button styling:
<Button
  variant="outline"  // Changed from ghost
  size="sm"
  className="w-full text-xs gap-2"
>
  <BookOpen className="h-3 w-3" />
  <span>Open Full Manuscript Reader</span>
  <ChevronRight className="h-3 w-3" />
</Button>
```

**ExpandableChapterItem.tsx changes:**

```typescript
// Add props for navigation
interface ExpandableChapterItemProps {
  chapter: Chapter;
  manuscriptId: string;  // NEW
  isRead: boolean;
  onMarkRead: () => void;
}

// Add Read button in chapter header (before chevron):
<Button
  variant="ghost"
  size="sm"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/library/manuscript/${manuscriptId}?chapter=${chapter.id}`);
  }}
  className="text-xs gap-1"
>
  Read
  <ChevronRight className="h-3 w-3" />
</Button>
```

**ManuscriptDetail.tsx changes:**

```typescript
// Read chapter from URL query param
const searchParams = new URLSearchParams(window.location.search);
const chapterFromUrl = searchParams.get('chapter');

// Use it in initial chapter logic
const initialChapter = chapterFromUrl || lastChapterId || manuscript.chapters[0]?.id;
```

---

### Summary

| Change | Purpose |
|--------|---------|
| "Read" button on collapsed card | Direct access without expanding |
| Enhanced footer button | More visible call-to-action |
| "Read" button per chapter | Jump directly to specific chapter |
| URL parameter support | Deep-link to specific chapters |
