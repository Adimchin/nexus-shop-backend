import type { Request, Response, NextFunction } from "express";
import z from "zod";

export const validator = (schema:z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const result = schema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string>= {};

      console.log("issues", result.error.issues);

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field) {
          errors[String(field)] = issue.message;
        }
      }

      return res.status(400).json({ error: errors });
    }

    next();
  };
};
