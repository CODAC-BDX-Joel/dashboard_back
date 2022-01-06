import {HttpService} from "@nestjs/axios";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./users/interfaces/user.interface";
import {Widget} from "./widgets/interfaces/widget.interface";
import {AxiosResponse} from 'axios';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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


    async getUserDetails() {
        const userDetails = await this.userModel.findById('61d55ec160ba94c788085d5b');
        return userDetails;
    }


    async XXXXgetMyWidgetsData() {
        // STEP fetch user's data via userId received from front end
        //TODO replace hardcoded user id a paramater in function
        const userDetails = await this.userModel.findById('61d4b0d2408c35e595d33458');
        const {widgetsList} = userDetails;

        //STEP list of all api's endpoints
        const allEndpoints = {
            crypto: {
                bitcoin: 'https://api.coindesk.com/v1/bpi/currentprice.json'
            },
            weather: {
                paris: 'https://www.metaweather.com/api/location/44418/',
            },
            activities: {
                randomActivities: 'https://www.boredapi.com/api/activity'
            }
        }


        //Define function fetching from api
        const fetchDataFromApi = async (uri) => {
            const value = await this.httpService.get(uri).toPromise();
            const apiData = await value.data;
            return apiData;
        }

        // get all datas from api one by one
        const bitcoinData = await fetchDataFromApi(allEndpoints.crypto.bitcoin);
        // console.log(bitcoinData); OK
        const weatherParisData = await fetchDataFromApi(allEndpoints.weather.paris);
        console.log(weatherParisData)


        // depending on user's subscription send the relevant api's data


        //TEMP PART

        // const endPoints = ['https://www.boredapi.com/api/activity', 'https://api.coindesk.com/v1/bpi/currentprice.json']
        //
        // const loopEndPoints = (epts) => {
        //     let apiData = ['toto'];
        //     epts.map(async ept => {
        //         const value = await this.httpService.get(ept).toPromise();
        //         const apiResponse = await value.data
        //         //TODO before pushing in array, build an object including widget's name, id , serice (id,name)
        //         apiData.push(apiResponse);
        //         console.log(apiData)
        //     })
        //     console.log('fin')
        //     console.log(apiData)
        // }
        //
        // loopEndPoints(endPoints);

        // console.log('result', result);

    }

//     async getMyWidgetsData() {
//         const urls = ['https://www.boredapi.com/api/activity', 'https://api.coindesk.com/v1/bpi/currentprice.json'];
//         let allResults = ['toto'];
//         // map every url to the promise
//         let requests = urls.map(url => this.httpService.get(url).toPromise());
//
//
//         // Promise.all waits until all jobs are resolved
//         Promise.all(requests)
//             .then(responses => {
//                 responses.forEach(response => {
//                     allResults.push(response.data);
//                 });
//                 // console.log(allResults);
//                 console.log(allResults);
//             })
//     }
}
