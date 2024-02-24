import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from 'src/auth/auth.service'; // Import AuthService
import { AuthModule } from 'src/auth/auth.module'; // Import the module containing AuthService
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule], // Import the module containing AuthService
  providers: [UserService, UserResolver, AuthService,ConfigService,PrismaService,JwtService],
})
export class UserModule {}
