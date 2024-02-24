import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { createWriteStream } from 'fs';
import { PostDetails, PostType } from './post.type';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async saveVideo(video: {
    createReadStream: () => any;
    filename: string;
    mimetype: string;
  }): Promise<string> {
    if (!video || !['video/mp4'].includes(video.mimetype)) {
      throw new BadRequestException(
        'Invalid video file format. Only MP4 is allowed.',
      );
    }

    const videoName = `${Date.now()}${extname(video.filename)}`;
    const videoPath = `/files/${videoName}`;

    const stream = video.createReadStream();
    const outputPath = `public${videoPath}`;
    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return videoPath;
  }


  async createPost(data: Prisma.PostCreateInput, userId: number): Promise<Post> {
    const uploadTimestamps = new Map<number, number>();
    const uploadLimitInterval = 60 * 1000; 
    const currentTime = Date.now();
    const lastUploadTime = uploadTimestamps.get(userId) || 0;
    const timeElapsedSinceLastUpload = currentTime - lastUploadTime;
    
    if (timeElapsedSinceLastUpload < uploadLimitInterval) {
      throw new Error("You have exceeded the upload limit. Please try again later.");
    }
  
    const post = await this.prisma.post.create({
      data: data,
    });
  
    uploadTimestamps.set(userId, currentTime);
  
    return post;
  }
  

  async getPost(id: number): Promise<PostDetails> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { user: true, likes: true, comments: true },
      });
      const postIds = await this.prisma.post.findMany({
        where: { userId: post.userId },
        select: { id: true },
      });

      return { ...post, otherPostIds: postIds.map((post) => post.id) };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  async getAllPosts(skip: number, take: number): Promise<PostType[]> {
    return await this.prisma.post.findMany({
      skip,
      take,
      include: { user: true, likes: true, comments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPostsByUser(userId: number): Promise<PostType[]> {
    return await this.prisma.post.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.getPost(id);

    if (post.video) {
      try {
        const fs = await import('fs');
        fs.unlinkSync(`public${post.video}`);
      } catch (err) {
        console.error(`Failed to delete video file: ${post.video}`, err);
      }
    }

    await this.prisma.post.delete({ where: { id } });
  }

async updatePostShares(id: number): Promise<Post | null> {
  try {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (post) {
      const currentShares = post.shares ?? 0;
      const newShares = currentShares + 1;
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data: {
          shares: newShares,
        },
      });
      console.log(`Shares count updated for post with id ${id}. New shares: ${updatedPost.shares}`);
      return updatedPost; 
    } else {
      console.error(`Post with id ${id} not found.`);
      return null;
    }
  } catch (err) {
    console.error('Error updating shares:', err);
    return null;
  }
}



}

export const storage = diskStorage({
  destination: './public/files',
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

