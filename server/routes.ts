import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/rsvp", async (req, res) => {
    try {
      const validatedData = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createRsvp(validatedData);
      
      res.status(201).json(rsvp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        console.error("Error creating RSVP:", error);
        res.status(500).json({ 
          error: "Internal server error" 
        });
      }
    }
  });

  app.get("/api/rsvp", async (req, res) => {
    try {
      const rsvps = await storage.getAllRsvps();
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
