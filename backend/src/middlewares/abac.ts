import { Request, Response, NextFunction } from "express";
import hasAccess from "../helpers/hasAccess";

export function hasActionAccess(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;        // from JWT middleware
    const resource = req.resource || {};

    if (!hasAccess(user, action, resource)) {
      return res.status(403).json({ error: "Access denied (ABAC)" });
    }

    next();
  };
}
