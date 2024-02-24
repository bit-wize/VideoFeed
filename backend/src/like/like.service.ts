import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikeCreateInput } from './like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async like(data: LikeCreateInput) {
    return this.prisma.like.create({ data });
  }

  async unlike(postId: number, userId: number) {
    return this.prisma.like.delete({
      where: { userId_postId: { postId, userId } },
    });
  }
}