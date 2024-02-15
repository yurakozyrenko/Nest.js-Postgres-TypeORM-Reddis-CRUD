import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PAGINATION } from 'src/constants/constants';

export interface PaginationOptions {
  skip?: number;
  take?: number;
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationOptions => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page, 10) || PAGINATION.PAGE;
    const limit = parseInt(request.query.limit, 10) || PAGINATION.LIMIT;

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  },
);
