import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await retrieveData("products");
    const categories = await retrieveData("categories");
    const types = await retrieveData("types");
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success",
      data: { products, categories, types },
    });
  }
}
