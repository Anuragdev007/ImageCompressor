// Storage interface for potential future database operations
// Currently, our image compression app processes everything client-side
// This file is ready for future enhancements that might require server-side storage

export interface IStorage {
  // Future methods for storing user preferences, compression history, etc.
  // Currently not used as the app operates entirely client-side
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder for future storage functionality
  }
}

export const storage = new MemStorage();
