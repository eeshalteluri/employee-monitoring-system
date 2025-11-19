import { Request, Response, NextFunction } from "express";
export interface AuthUserPayload {
    id: string;
    email: string;
    role: "admin" | "manager" | "employee";
}
export declare const auth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const requireRole: (roles: AuthUserPayload["role"][]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map