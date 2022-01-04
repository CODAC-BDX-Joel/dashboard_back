import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";

// TODO import Widget schema once it is created in order to specify relation to widget model
// import {Widget} from "../../widgets/schemas/widget.schema";

export type ServiceDocument = Service & Document;

@Schema({timestamps: true})
export class Service {
    @Prop({unique: true, required: true})
    name: string;

    @Prop({default: []})
    widgets: String[];

    //TODO uncomment the following 2 lines and delete the above @Prop & widgets line once widgets created in order to specify relation to widget model
    // @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}])
    // widgets: object;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);