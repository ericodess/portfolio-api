import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
    },
    variants: [String],
});

const ItemModel = model("items", ItemSchema);

export default ItemModel;
