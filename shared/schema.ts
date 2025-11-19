import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rsvps = pgTable("rsvps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  numberOfGuests: integer("number_of_guests").notNull().default(1),
  dietaryRestrictions: text("dietary_restrictions"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRsvpSchema = createInsertSchema(rsvps, {
  email: z.string().email("Email invalide"),
  fullName: z.string().min(2, "Le nom complet est requis"),
  numberOfGuests: z.number().min(1, "Au moins 1 invité").max(10, "Maximum 10 invités"),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvps.$inferSelect;
