import {Controller, Get, Post, Put, Patch, Delete, Body, Param} from '@nestjs/common';
import {CreateWidgetDto} from "./dto/create-widget.dto";
import {UpdateWidgetDto} from "./dto/update-widget.dto";
import {WidgetsService} from "./widgets.service";
import {Widget} from "./interfaces/widget.interface";
import {Service} from "../services/interfaces/service.interface";


@Controller('widgets')
export class WidgetsController {
    constructor(private readonly widgetsServices: WidgetsService) {
    }

    @Post()
    create(@Body() createWidgetDto: CreateWidgetDto): Promise<Widget> {
        return this.widgetsServices.create(createWidgetDto);
    }

    @Get()
    async findAll(): Promise<Widget[]> {
        return this.widgetsServices.findAll();
    }

    @Get(':id')
    findOne(): string {
        return 'find one widget'
    }

    @Delete()
    delete(): string {
        return 'delete one widget'
    }

    @Put(':id')
    update(@Body() updateWidgetDto: UpdateWidgetDto, @Param('id') id): string {
        return `widget id : ${id} update content ${updateWidgetDto.description}`
    }

    //one user request his/her widgets datas
    @Get('/widgetsData/:userId')
    getMyWidgetsData(@Param('userId') userId){
        // return `Here are widgets data for user id:  ${userId}`
        // return this.widgetsServices.getWidgetsData();
    }
}


