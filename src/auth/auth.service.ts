import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {from, Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (bcrypt.compareSync(password, user.password)) {
            const { username, id, email, widgetsList } = user;
            return {
                _id: id,
                username: username,
                email: email,
                widgetsList: widgetsList
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user._id};

        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }
}
