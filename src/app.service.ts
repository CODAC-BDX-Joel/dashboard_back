import {HttpService} from "@nestjs/axios";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./users/interfaces/user.interface";
import {Widget} from "./widgets/interfaces/widget.interface";

@Injectable()
export class AppService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Widget') private readonly widgetModel: Model<Widget>,
        private httpService: HttpService
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }

    async getMyWidgetsData() {
        //get user's info
        //TODO replace hardcoded user id a paramater in function
        const response = await this.userModel.findById('61d4b0d2408c35e595d33458');
        //  return response;
        //  return typeof (response)

        const widgetsData = ['toto'];
        const {widgetsList} = response;

        const toto = async () => {
            // @ts-ignore
            widgetsList.map(async widgetId => {
                //each loop
                //fetch widgets info (endpoint)
                const widgetDetails = await this.widgetModel.findById(widgetId);
                // @ts-ignore

                // const apiData = await fetch(widgetDetails.endpoint);
                const response = this.httpService.get(widgetDetails.endpoint);
                console.log(response)
                // console.log(apiData)
                // console.log(widgetDetails.endpoint);

                // const apiData = await fetch()
                //once endpoint received fetch info from api
                // @ts-ignore
                //create object {widgename }
                // widgetsData.push(apiData);
                // console.log(widgetsData);
                // return widgetsData
            })
        };
        await toto();



    }


}
