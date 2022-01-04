import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServicesController} from './services/services.controller';
import {ServicesService} from './services/services.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ServicesModule} from "./services/services.module";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ServicesModule,
        // ConfigModule.forRoot({isGlobal: true}),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
