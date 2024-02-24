import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/graphql-auth/graphql-auth.guard';

import { LikeService } from './like.service';

import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { LikeType } from './like.model';

@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => LikeType)
  @UseGuards(GraphqlAuthGuard)
  async like(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return this.likeService.like({
      userId: ctx.req.user.sub,
      postId: postId,
    });
  }

  @Mutation(() => LikeType)
  @UseGuards(GraphqlAuthGuard)
  async unlike(
    @Args('postId') postId: number,
    @Context() ctx: { req: Request },
  ) {
    return this.likeService.unlike(postId, ctx.req.user.sub);
  }
}