import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

// Inject the authenticated user's ID. Must be used together with SessionGuard.
export const CurrentUserId = createParamDecorator(
    (_data: unknown, context: ExecutionContext): string => {
        const req = context.switchToHttp().getRequest<Request>();
        return req.session.userId!;
    },
);
