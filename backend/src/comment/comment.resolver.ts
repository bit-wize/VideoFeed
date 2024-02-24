import { UseGuards } from '@nestjs/common';
import { Args, Context, Resolver, Query } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/graphql-auth/graphql-auth.guard';
import { CommentService } from './comment.service';
import { Comment } from './comment.model';
import { Mutation } from '@nestjs/graphql';
import { Request } from 'express';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query((returns) => [Comment])
  async getCommentsByPost(@Args('postId') postId: number) {
    return this.commentService.getCommentsByPost(postId);
  }
  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => Comment)
  createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() ctx: { req: Request },
  ) {
    return this.commentService.createComment({
      text: text,
      user: { connect: { id: ctx.req.user.sub } },
      post: { connect: { id: postId } },
    });
  }
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number, @Context() ctx: { req: Request }) {
    return this.commentService.deleteComment(id, ctx.req.user.sub);
  }
}