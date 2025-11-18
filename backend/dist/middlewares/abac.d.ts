import { Request, Response, NextFunction } from "express";
export declare function hasActionAccess(action: string): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=abac.d.ts.map