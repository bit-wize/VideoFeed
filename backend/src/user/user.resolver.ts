import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { RegisterResponse, LoginResponse } from 'src/auth/authTypes';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/register.dto';
import { Response, Request, query } from 'express';
import { LoginDTO } from 'src/auth/login.dto';
import { GraphQLErrorFilter } from 'src/GraphQLErrorFilter';
import { User } from './user.model';
import { UserService } from './user.service';
import { GraphqlAuthGuard } from 'src/graphql-auth/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';

@Resolver()
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }
    @Mutation(() => RegisterResponse)
    @UseFilters(GraphQLErrorFilter)
    async register(
        @Args('registerInput') registerDto: RegisterDTO,
        @Context() context: { res: Response },
    ): Promise<RegisterResponse> {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException({
                confirmPassword: 'Password and confirm password should match.',
            });
        }
        const { user } = await this.authService.register(
            registerDto,
            context.res,
        );
        console.log('user!', user);
        return { user };

    }

    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginDto: LoginDTO,
        @Context() context: { res: Response },
    ) {
        return this.authService.login(loginDto, context.res);
    }

    @Mutation(() => String)
    async logout(@Context() context: { res: Response }) {
        return this.authService.logout(context.res);
    }

    @Mutation(() => String)
    async refreshToken(@Context() context: { req: Request; res: Response }) {
        try {
            return this.authService.refreshToken(context.req, context.res);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Query(() => [User])
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Query(() => User, { nullable: true })
    async getUser(@Args('id', { type: () => Int }) userId: number): Promise<User | null> {
      return this.userService.getUser(userId);
    }

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => User)
    async updateProfile(
        @Context()
        context: { req: Request },
        @Args('fullname', { type: () => String, nullable: true }) fullname?: string,
        @Args('bio', { type: () => String, nullable: true }) bio?: string,
        @Args('image', { type: () => GraphQLUpload, nullable: true })
        image?: GraphQLUpload,
    ) {
        let imageUrl;
        if (image) {
            imageUrl = await this.storeImageAndGetURL(image);
        }
        return this.userService.updateProfile(context.req.user.sub, {
            fullname,
            bio,
            image: imageUrl,
        });
    }

    async storeImageAndGetURL(file: GraphQLUpload): Promise<string> {
        const { createReadStream, filename } = await file;
        const fileData = await file;
        console.log('fileData!', fileData);
    
        const uniqueFilename = `${uuidv4()}_${filename}`;
        const imagePath = join(process.cwd(), 'public', uniqueFilename);
        const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
        const readStream = createReadStream();
        readStream.pipe(createWriteStream(imagePath));
    
        return imageUrl; 
      }




}
