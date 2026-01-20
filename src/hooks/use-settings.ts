import { useState, useEffect, useCallback } from "react";

interface Settings {
  cloudSyncEnabled: boolean;
  lastSyncedAt: string | null;
}

const SETTINGS_KEY = "app-settings";

const defaultSettings: Settings = {
  cloudSyncEnabled: false,
  lastSyncedAt: null,
};

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const toggleCloudSync = useCallback(() => {
    updateSettings({ cloudSyncEnabled: !settings.cloudSyncEnabled });
  }, [settings.cloudSyncEnabled, updateSettings]);

  const setLastSyncedAt = useCallback((timestamp: string) => {
    updateSettings({ lastSyncedAt: timestamp });
  }, [updateSettings]);

  return {
    settings,
    updateSettings,
    toggleCloudSync,
    setLastSyncedAt,
    isCloudSyncEnabled: settings.cloudSyncEnabled,
    lastSyncedAt: settings.lastSyncedAt,
  };
}
