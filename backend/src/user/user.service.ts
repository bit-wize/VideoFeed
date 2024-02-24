import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async updateProfile(
        userId: number,
        data: { fullname?: string; bio?: string; image?: string },
    ) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                fullname: data.fullname,
                bio: data.bio,
                image: data.image,
            },
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    async getUser(userId: number): Promise<User> {
        return this.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      }
}
