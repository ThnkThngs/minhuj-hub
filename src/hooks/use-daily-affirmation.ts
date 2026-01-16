import { useState, useEffect, useCallback } from "react";
import { getAffirmationForDate, DailyAffirmation } from "@/config/affirmations";

const STORAGE_KEY = "daily-affirmation-state";

interface AffirmationState {
  lastShownDate: string;
  savedAffirmations: string[];
  showPopupEnabled: boolean;
}

const getStoredState = (): AffirmationState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse affirmation state:", e);
  }
  return {
    lastShownDate: "",
    savedAffirmations: [],
    showPopupEnabled: true,
  };
};

const saveState = (state: AffirmationState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save affirmation state:", e);
  }
};

export function useDailyAffirmation() {
  const [todayAffirmation, setTodayAffirmation] = useState<DailyAffirmation>(
    getAffirmationForDate()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [savedAffirmations, setSavedAffirmations] = useState<string[]>([]);
  const [popupEnabled, setPopupEnabled] = useState(true);

  // Initialize state from localStorage
  useEffect(() => {
    const state = getStoredState();
    setSavedAffirmations(state.savedAffirmations);
    setPopupEnabled(state.showPopupEnabled);

    const today = new Date().toDateString();
    
    // Check if we should show the popup (first visit of the day)
    if (state.showPopupEnabled && state.lastShownDate !== today) {
      // Delay popup slightly for better UX
      const timer = setTimeout(() => {
        setShouldShowPopup(true);
        setIsDialogOpen(true);
        // Mark as shown for today
        saveState({
          ...state,
          lastShownDate: today,
        });
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setShouldShowPopup(false);
  }, []);

  const toggleSaveAffirmation = useCallback((affirmationId: string) => {
    setSavedAffirmations((prev) => {
      const newSaved = prev.includes(affirmationId)
        ? prev.filter((id) => id !== affirmationId)
        : [...prev, affirmationId];
      
      const state = getStoredState();
      saveState({
        ...state,
        savedAffirmations: newSaved,
      });
      
      return newSaved;
    });
  }, []);

  const isAffirmationSaved = useCallback(
    (affirmationId: string) => savedAffirmations.includes(affirmationId),
    [savedAffirmations]
  );

  const togglePopupEnabled = useCallback(() => {
    setPopupEnabled((prev) => {
      const newValue = !prev;
      const state = getStoredState();
      saveState({
        ...state,
        showPopupEnabled: newValue,
      });
      return newValue;
    });
  }, []);

  return {
    todayAffirmation,
    isDialogOpen,
    openDialog,
    closeDialog,
    toggleSaveAffirmation,
    isAffirmationSaved,
    popupEnabled,
    togglePopupEnabled,
    shouldShowPopup,
    savedAffirmations,
  };
}
