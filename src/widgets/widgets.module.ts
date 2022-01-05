import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {WidgetsController} from "./widgets.controller";
import {WidgetsService} from "./widgets.service";
import {Widget,WidgetSchema} from "./schemas/widget.schema";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Widget.name, schema: WidgetSchema }])],
    controllers: [WidgetsController],
    providers: [WidgetsService],


})
export class WidgetsModule {}
