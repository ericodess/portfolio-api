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
    public static visibleParameters = ["name", "date", "orders", "isOpen"];

    private static _populateOptions = {
        path: "orders",
        select: ["status", "client"],
        populate: [
            {
                path: "operator",
                select: "displayName",
            },
            {
                path: "realm",
                select: "name",
            },
            {
                path: "items",
                select: "name",
            },
        ],
    } as PopulateOptions;

    public static async query(values: EventQueryableParams, populate = true) {
        await DatabaseService.getConnection();

        const query = [];

        if (values.id) {
            query.push({
                _id: values.id,
            });
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

        if (values.isOpen !== null && values.isOpen !== undefined) {
            query.push({
                isOpen: values.isOpen,
            });
        }

        if (populate) {
            return await EventModel.find(
                query.length === 0 ? null : { $or: query }
            )
                .select(EventService.visibleParameters)
                .populate(EventService._populateOptions);
        }

        return await EventModel.find(
            query.length === 0 ? null : { $or: query }
        ).select(EventService.visibleParameters);
    }

    public static async queryById(id: string) {
        await DatabaseService.getConnection();

        return await EventModel.findById(id)
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async save(values: EventCreatableParams) {
        await DatabaseService.getConnection();

        const newEntry = new EventModel();

        newEntry.name = values.name.trim();
        newEntry.date = DateService.standarizeCurrentDate(
            new Date(values.date)
        );
        newEntry.isOpen = values.isOpen ?? false;

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
                    isOpen: values.isOpen,
                },
            },
            { new: true, runValidators: true, setDefaultsOnInsert: false }
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
