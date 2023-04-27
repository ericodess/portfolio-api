import { PopulateOptions, Types } from "mongoose";

// Models
import { EventModel, OrderModel } from "@models";

// Services
import {
    DatabaseService,
    DateService,
    OrderService,
    RequestService,
    StringService,
} from "@services";

interface DefaultParams {
    id?: string;
    name?: string;
    date?: Date;
    orders?: Types.ObjectId[];
}

type EditableParams = Pick<DefaultParams, "name">;

export class EventService {
    public static visibleParameters = ["name", "date", "orders"];

    private static _populateOptions = {
        path: "orders",
        select: ["status", "client"],
        populate: [
            {
                path: "operator",
                select: "displayName",
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

    public static async queryAll() {
        await DatabaseService.getConnection();

        return EventModel.find().select(EventService.visibleParameters);
    }

    public static async query(values: DefaultParams) {
        const query = [];

        await DatabaseService.getConnection();

        if (values.id) {
            return (
                await EventModel.findById(values.id.trim()).select(
                    EventService.visibleParameters
                )
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

        if (values.orders) {
            query.push({ orders: values.orders });
        }

        return await EventModel.find(query.length === 0 ? null : { $or: query })
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async save(values: EditableParams) {
        await DatabaseService.getConnection();

        const newEntry = new EventModel();

        newEntry.name = values.name.trim();
        newEntry.date = DateService.standarizeCurrentDate(new Date());

        return newEntry.save();
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        return EventModel.findByIdAndUpdate(
            StringService.toObjectId(id),
            { $set: values },
            { new: true, runValidators: true }
        )
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    public static async delete(id: string) {
        await DatabaseService.getConnection();

        const eventId = StringService.toObjectId(id);

        const foundOrders = await OrderModel.find({
            event: eventId,
        });

        for (const foundOrder of foundOrders) {
            await OrderModel.findByIdAndDelete(foundOrder._id);
        }

        return EventModel.findByIdAndDelete(eventId);
    }
}
