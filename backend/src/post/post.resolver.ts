import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { PostService } from './post.service';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Request } from 'express';
import { PostDetails, PostType } from './post.type';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/graphql-auth/graphql-auth.guard';
@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => PostType)

  async createPost(
    @Context() context: { req: Request },
    @Args({ name: 'video', type: () => GraphQLUpload }) video: any,
    @Args('text') text: string,
  ) {
    const userId = context.req.user.sub;
    const videoPath = await this.postService.saveVideo(video);
    const postData = {
      text,
      video: videoPath,
      user: { connect: { id: userId } },
    };

    return await this.postService.createPost(postData,userId);
  }

  @Query((returns) => PostDetails)
  async getPost(@Args('id') id: number) {
    return await this.postService.getPost(id);
  }
  @Query((returns) => [PostType])
  async getAllPosts(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 1 }) take: number,
  ): Promise<PostType[]> {
    return await this.postService.getAllPosts(skip, take);
  }




  @Mutation((returns) => PostType)
  async deletePost(@Args('id') id: number) {
    return await this.postService.deletePost(id);
  }

  @Query((returns) => [PostType])
  async getPostsByUser(@Args('userId') userId: number) {
    return await this.postService.getPostsByUser(userId);
  }

  @Mutation((returns) => PostType)
  async updatePostShares(@Args('id') id: number){
    return await this.postService.updatePostShares(id);
  }
}