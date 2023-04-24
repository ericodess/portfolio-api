import { Schema, model } from "mongoose";

const validateEventDate = async (date: Date) => {
    const entry = await EventModel.findOne({ date });

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

const EventModel = model("events", EventSchema);

export default EventModel;
