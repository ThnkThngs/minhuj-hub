

## Add Share Button to Heritage Stories

### The Issue
The Stories page (`/stories`) currently doesn't have a share button. The generated story card and saved story cards only have:
- Star (favorite) button
- Bookmark (save) button
- Delete button (for saved stories)

The share functionality exists in the Affirmations dialog but was not implemented for Stories.

---

### Solution

Add a share button to both:
1. **Generated Story Card** - Share the newly generated story
2. **Saved Story Cards** - Share any saved story

The share logic will use the same pattern from the Affirmations dialog:
- Use `navigator.share` for native device sharing (mobile)
- Fallback to clipboard copy for desktop browsers

---

### Implementation

**File to Update:** `src/pages/Stories.tsx`

#### Changes:

1. **Import Share2 icon** from lucide-react

2. **Add handleShareStory function:**
```typescript
const handleShareStory = async (story: Story | SavedStory) => {
  const shareText = `${story.title}\n\n${story.content}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: story.title,
        text: shareText,
      });
    } catch (e) {
      // User cancelled or error - silently fail
    }
  } else {
    await navigator.clipboard.writeText(shareText);
    toast({
      title: "Copied to clipboard",
      description: "The story has been copied to your clipboard.",
    });
  }
};
```

3. **Add Share button to Generated Story Card** (lines 164-181):
   - Add a Share2 icon button alongside the existing Star and Bookmark buttons

4. **Add Share button to SavedStoryCard** component:
   - Pass an `onShare` prop to the component
   - Add a Share2 icon button in the action buttons area

---

### Visual Design

**Generated Story Card Actions:**
```
[⭐ Star] [🔖 Bookmark] [📤 Share]
```

**Saved Story Card Actions:**
```
[⭐ Star] ... [📤 Share] [🗑️ Delete]
```

---

### Summary

| File | Changes |
|------|---------|
| `src/pages/Stories.tsx` | Add Share2 import, handleShareStory function, share buttons to both card types |

