import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule, Query, Resolver } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Resolver()
export class FooResolver {

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot:'/'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res })
    }),
    ConfigModule.forRoot({}),
    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService,FooResolver, UserResolver,UserService, PrismaService,AuthService,JwtService],
})
export class AppModule { }

