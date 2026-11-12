import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { Observable } from "rxjs";

// Reject requests that do not belong to an authenticated session.
@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();

        if(!req.session.userId) {
            throw new UnauthorizedException({
                statusCode: 401,
                errors: [{field: 'session', code: 'NOT_AUTHENTICATED' }]
            })
        }
        return true;
    }
}