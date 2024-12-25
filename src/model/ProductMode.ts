import mongoose, { Schema, Document } from "mongoose";

interface Rating {
    rate: number;
    count: number;
}

export interface ProductDocument extends Document {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

const RatingSchema: Schema = new Schema({
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
});

const ProductSchema: Schema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: RatingSchema, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
