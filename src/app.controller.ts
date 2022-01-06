import {HttpService} from "@nestjs/axios";
import {Controller, Get, Post, Request, UseGuards, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from "./auth/auth.service";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./users/interfaces/user.interface";

@Controller()
export class AppController {
    // constructor(private readonly appService: AppService) {}
    constructor(
        private readonly authService: AuthService,
        private readonly appService: AppService,
        private httpService: HttpService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(): string {
        return 'Ni Hao ma?'
    }

    //TODO uncomment below useguards when all ready
    // @UseGuards(LocalAuthGuard)
    @Get('/myWidgetsData/:userId')
    async getMyWidgetsData(@Param('userId') userId) {
        console.log(userId)
    }

    @Get('/toto')
    async getToto() {
        // return this.appService.getMyWidgetsData()
        const urls = ['https://www.boredapi.com/api/activity', 'https://api.coindesk.com/v1/bpi/currentprice.json', 'https://www.metaweather.com/api/location/44418/'];
        let allResults = ['toto'];
        // map every url to the promise
        let requests = urls.map(url => this.httpService.get(url).toPromise());

        // Promise.all waits until all jobs are resolved
        allResults = await Promise.all(requests)
            .then(responses => {
                responses.forEach(response => {
                    allResults.push(response.data);
                });
                return allResults;
            });
        // console.log(allResults);
        return allResults;
    }
}
