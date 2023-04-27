import { PopulateOptions, Types } from "mongoose";

// Models
import { EventModel } from "@models";

// Services
import { DatabaseService, DateService, RequestService } from "@services";

interface DefaultParams {
    id?: string;
    name?: string;
    date?: Date;
    orders?: Types.ObjectId[];
}

type EditableParams = Omit<DefaultParams, "id" | "date">;

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

    //TODO Fix backwards saving => Saving of the entry at ref entry
    public static async save(values: EditableParams) {
        await DatabaseService.getConnection();

        const newEntry = new EventModel();

        newEntry.name = values.name.trim();
        newEntry.date = DateService.standarizeCurrentDate(new Date());
        newEntry.orders = values.orders;

        return newEntry.save();
    }

    //TODO Fix backwards update => Update of the entry at ref entry
    public static async update(
        id: string,
        values: EditableParams,
        willAppendOrderIds = false
    ) {
        await DatabaseService.getConnection();

        values.name = values.name?.trim();

        if (values.orders && willAppendOrderIds) {
            const productToBeUpdated = await EventModel.findById(id);

            values.orders = productToBeUpdated.orders.concat(values.orders);
        }

        return EventModel.findByIdAndUpdate(
            id.trim(),
            { $set: values },
            { new: true, runValidators: true }
        )
            .select(EventService.visibleParameters)
            .populate(EventService._populateOptions);
    }

    //TODO Fix backwards deletion => Deletion of the entry at ref entry
    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return EventModel.findByIdAndDelete(id.trim());
    }
}
