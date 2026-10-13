import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const volunteerEnquiriesTable = pgTable('volunteer_enquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  readAt: timestamp('read_at', { withTimezone: true }),
});

export const insertVolunteerEnquirySchema = createInsertSchema(volunteerEnquiriesTable).omit({
  id: true, createdAt: true, readAt: true,
});
export type InsertVolunteerEnquiry = z.infer<typeof insertVolunteerEnquirySchema>;
export type VolunteerEnquiry = typeof volunteerEnquiriesTable.$inferSelect;
