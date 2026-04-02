import AsyncStorage from '@react-native-async-storage/async-storage';
// We are using Async For ton to avoid expo prebuild, to allow test without apple account and play store
// Note: Currently using AsyncStorage, will be replaced with MMKV in the future
// When migrating to MMKV, remove async/await and use synchronous methods

export class PersistStorage {
  static async getString(key: string): Promise<string | undefined> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ?? undefined;
    } catch {
      return undefined;
    }
  }

  static async setString(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Handle error silently
    }
  }

  static async getBoolean(key: string): Promise<boolean | undefined> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return undefined;
      return value === 'true';
    } catch {
      return undefined;
    }
  }

  static async setBoolean(key: string, value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch {
      // Handle error silently
    }
  }

  static async getNumber(key: string): Promise<number | undefined> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return undefined;
      const parsed = parseFloat(value);
      return isNaN(parsed) ? undefined : parsed;
    } catch {
      return undefined;
    }
  }

  static async setNumber(key: string, value: number): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch {
      // Handle error silently
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Handle error silently
    }
  }

  static async delete(key: string): Promise<void> {
    return this.remove(key);
  }

  static async contains(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch {
      return false;
    }
  }

  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {
      // Handle error silently
    }
  }

  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch {
      return [];
    }
  }

  // JSON serialization helpers
  static async getObject<T>(key: string): Promise<T | undefined> {
    try {
      const jsonString = await AsyncStorage.getItem(key);
      if (jsonString) {
        try {
          return JSON.parse(jsonString) as T;
        } catch {
          return undefined;
        }
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  static async setObject<T>(key: string, value: T): Promise<void> {
    try {
      const jsonString = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonString);
    } catch {
      // Handle error silently
    }
  }
}
