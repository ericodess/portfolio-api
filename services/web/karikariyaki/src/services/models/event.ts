import { PopulateOptions } from "mongoose";
import {
    EventCreatableParams,
    EventEditableParams,
    EventQueryableParams,
} from "karikarihelper";

// Models
import { EventModel, OrderModel } from "@models";

// Services
import { DatabaseService, DateService, StringService } from "@services";

export class EventService {
    public static visibleParameters = ["name", "date", "orders"];

    private static _populateOptions = {
        path: "orders",
        select: ["status", "client"],
        populate: [
            {
                path: "operator",
                select: ["displayName", "realm"],
                populate: {
                    path: "realm",
                    select: "name",
                },
            },
            {
                path: "item",
                select: "name",
            },
            {
                path: "variant",
                select: "name",
            },
        ],
    } as PopulateOptions;

    public static async query(values: EventQueryableParams) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            return (
                await EventModel.findById(
                    StringService.toObjectId(values.id)
                ).select(EventService.visibleParameters)
            ).populate(EventService._populateOptions);
        }

        if (values.name) {
            query.push({
                name: DatabaseService.generateBroadQuery(values.name),
            });
        }

        if (values.date) {
            query.push({
                date: DatabaseService.generateStandarizedDateQuery(values.date),
            });
        }

        return await EventModel.find(query.length === 0 ? null : { $or: query })
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async save(values: EventCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new EventModel();

        newEntry.name = values.name.trim();
        newEntry.date = DateService.standarizeCurrentDate(values.date);

        await newEntry.save();

        return EventModel.findById(newEntry._id)
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async update(id: string, values: EventEditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        return EventModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            {
                $set: {
                    name: values.name,
                },
            },
            { new: true, runValidators: true }
        )
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const eventId = StringService.toObjectId(id);

        await OrderModel.deleteMany({
            event: eventId,
        });

        return EventModel.findByIdAndDelete(eventId)
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }
}
