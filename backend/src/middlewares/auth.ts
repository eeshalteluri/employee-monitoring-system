import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthUserPayload {
  id: string;
  email: string;
  role: "admin" | "manager" | "employee";
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUserPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export const requireRole = (roles: AuthUserPayload["role"][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as AuthUserPayload | undefined;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
