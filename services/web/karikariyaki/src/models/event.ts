import { Schema, model } from "mongoose";

// Types
import { Statics } from "@types";

// Services
import { EventService } from "@services";

const validateEventDate = async (date: Date) => {
    const entry = await EventModel.findOne({
        date: EventService.standarizeCurrentDate(date),
    });

    if (entry) {
        throw Error("Event date is duplicated");
    }
};

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
    },
    date: {
        type: Date,
        required: [true, "Event date is required"],
        validate: validateEventDate,
    },
});

const EventModel = model(Statics.EVENT_COLLECTION_NAME, EventSchema);

export default EventModel;
