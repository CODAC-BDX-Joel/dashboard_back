import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ServicesModule} from "./services/services.module";
import {ConfigModule} from '@nestjs/config';
import {WidgetsModule} from './widgets/widgets.module';
import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        ServicesModule,
        UsersModule,
        // ConfigModule.forRoot({isGlobal: true}),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        WidgetsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
