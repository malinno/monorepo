import { STORAGE_KEYS } from "./constants";

class StorageService {
  private isClient = typeof window !== "undefined";

  setItem(key: string, value: any): void {
    if (!this.isClient) return;

    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  getItem<T = any>(key: string): T | null {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }

  removeItem(key: string): void {
    if (!this.isClient) return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  clear(): void {
    if (!this.isClient) return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  // Auth specific methods
  setTokens(accessToken: string, refreshToken: string): void {
    this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  getTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: this.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN),
      refreshToken: this.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN),
    };
  }

  clearTokens(): void {
    this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUser(user: any): void {
    this.setItem(STORAGE_KEYS.USER_DATA, user);
  }

  getUser(): any | null {
    return this.getItem(STORAGE_KEYS.USER_DATA);
  }

  clearUser(): void {
    this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  clearAuth(): void {
    this.clearTokens();
    this.clearUser();
  }
}

export const storageService = new StorageService();
