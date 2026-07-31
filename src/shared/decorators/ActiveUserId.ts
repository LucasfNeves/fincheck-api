import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

interface AuthenticatedRequest extends Request {
  userId: string;
}

export const ActiveUserId = createParamDecorator<{ userId: string }>(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }

    return userId;
  },
);
