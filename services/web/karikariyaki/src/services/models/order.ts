import { PopulateOptions, Types } from "mongoose";

// Models
import { OrderModel } from "@models";

// Services
import { DatabaseService, RequestService, StringService } from "@services";

// Enum
import { OrderStatus } from "@enum";

interface Params {
    id?: string;
    event?: string;
    status?: string;
    operator?: string;
    client?: string;
    item?: string;
    variant?: string;
}

type EditableParams = Omit<Params, "id">;

export class OrderService {
    public static visibleParameters = ["status", "client"];

    private static _populateOptions = [
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
    ] as PopulateOptions[];

    public static async queryAll() {
        await DatabaseService.getConnection();

        return OrderModel.find().select(OrderService.visibleParameters);
    }

    public static async query(values: Params) {
        const query = [];

        await DatabaseService.getConnection();

        if (values.id) {
            return (
                await OrderModel.findById(values.id).select(
                    OrderService.visibleParameters
                )
            ).populate(OrderService._populateOptions);
        }

        if (values.event) {
            query.push({ event: values.event });
        }

        if (values.status) {
            query.push({ status: values.status });
        }

        if (values.operator) {
            query.push({ operator: values.operator });
        }

        if (values.client) {
            query.push({ client: values.client });
        }

        if (values.item) {
            query.push({ item: values.item });
        }

        if (values.variant) {
            query.push({ variant: values.variant });
        }

        return await OrderModel.find(query.length === 0 ? null : { $or: query })
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    public static async save(values: EditableParams) {
        await DatabaseService.getConnection();

        const newEntry = new OrderModel();

        newEntry.event = StringService.toObjectId(values.event);
        newEntry.status = newEntry.status;
        newEntry.operator = StringService.toObjectId(values.operator);
        newEntry.client = values.client?.trim();
        newEntry.item = StringService.toObjectId(values.item);
        newEntry.variant = StringService.toObjectId(values.variant);

        return newEntry.save();
    }

    public static async update(id: string, values: EditableParams) {
        await DatabaseService.getConnection();

        return OrderModel.findByIdAndUpdate(
            id.trim(),
            { $set: values },
            { new: true, runValidators: true }
        )
            .select(OrderService.visibleParameters)
            .populate(OrderService._populateOptions);
    }

    //TODO Fix backwards deletion => Deletion of the entry at ref entry
    public static async delete(id: string) {
        await DatabaseService.getConnection();

        return OrderModel.findByIdAndDelete(id.trim());
    }
}
