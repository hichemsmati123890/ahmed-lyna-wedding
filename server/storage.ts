import { rsvps, type Rsvp, type InsertRsvp } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getRsvp(id: string): Promise<Rsvp | undefined>;
  getAllRsvps(): Promise<Rsvp[]>;
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
}

export class DatabaseStorage implements IStorage {
  async getRsvp(id: string): Promise<Rsvp | undefined> {
    const [rsvp] = await db.select().from(rsvps).where(eq(rsvps.id, id));
    return rsvp || undefined;
  }

  async getAllRsvps(): Promise<Rsvp[]> {
    return await db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
  }

  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const [rsvp] = await db
      .insert(rsvps)
      .values(insertRsvp)
      .returning();
    return rsvp;
  }
}

export const storage = new DatabaseStorage();
