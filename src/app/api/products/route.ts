import connectDB from "@/lib/db";
import ProductModel from "@/model/ProductMode";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        await connectDB();
        const products = await ProductModel.find();

        if (!products) {
            return res.status(404).json({
                error: 'no products found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'products found',
            products
        })


    } catch (error) {
        return res.status(500).json({
            error: 'failed to load data',
            message: error
        })

    }
}