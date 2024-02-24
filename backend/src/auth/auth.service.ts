import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response, Request, response } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) { }

    async refreshToken(req: Request, res: Response): Promise<string> {
        const rt = req.cookies['refresh_token']
        if (!rt) {
            throw new UnauthorizedException({ rt: 'Refresh Token Not Found' })
        } else {
            let payload
            try {
                payload = this.jwtService.verify(rt)

            } catch (e) {
                throw new UnauthorizedException({ rt: 'Invalid or Expired Refresh Token' })
            }
            const userExists = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!userExists) {
                throw new BadRequestException({ rt: 'User no longer exists' });
            }

            const expiresIn = 20000;
            const expiration = Math.floor(Date.now() / 1000) + expiresIn;
            const accessToken = this.jwtService.sign(
                { ...payload, exp: expiration },
                {
                    secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                },
            );

            res.cookie('access_token', accessToken, { httpOnly: true });

            return accessToken;

        }
    }

    async issueTokens(user: User, res: Response) {
        const payload = { username: user.fullname, sub: user.id }
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '600sec',
            secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),

        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '10d',
            secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),

        });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return { user };
    }

    async login(loginDTO: LoginDTO, res: Response) {


        const user = await this.prisma.user.findUnique({
            where: { email: loginDTO.email }
        })

        if (user == null || user == undefined) {
            throw new BadRequestException('No user is associated with this mail.');
        }
        const password = await bcrypt.compare(loginDTO.password, user.password);
        if (password == false) {
            throw new BadRequestException('Incorrect password.');
        }
        console.log('User Logged In Successfully')
        return this.issueTokens(user, res);

    }





    async register(registerDTO: RegisterDTO, res: Response) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDTO.email }
        });

        if (registerDTO.fullname.length < 3) {
            throw new BadRequestException({ fullname: 'Fullname must be at least 3 characters' });
        }

        if (!existingUser) {
            const password = await bcrypt.hash(registerDTO.password, 12);

            const user = await this.prisma.user.create({
                data: {
                    fullname: registerDTO.fullname,
                    password: password,
                    email: registerDTO.email
                }
            });
            console.log('User Registered Successfully')
            return this.issueTokens(user, res);
        } else {
            throw new BadRequestException({ email: 'User Already Exists' });
        }

    }

    async logout(res: Response) {
        try {
            res.clearCookie('access_token', { httpOnly: true, secure: true });
            res.clearCookie('refresh_token', { httpOnly: true, secure: true });
            console.log('User Logged Out Successfully');
            return true; // Return true to indicate successful logout
        } catch (error) {
            console.error('Error logging out user:', error);
            return false; // Return false to indicate failure
        }
    }
    

}
