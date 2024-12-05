import { addData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.created_at = new Date();
          data.updated_at = new Date();
          data.price = parseInt(data.price);
          data.stock = parseInt(data.stock);
          await addData("products", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: { id: result.id },
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
                data: {},
              });
            }
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { product }: any = req.query;
    const data = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          if (!data) {
            return res.status(400).json({
              status: false,
              statusCode: 400,
              message: "Invalid data",
              data: {},
            });
          }

          data.updated_at = new Date();
          data.price = parseInt(data.price);
          data.stock = parseInt(data.stock);

          await updateData("products", product[0], data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: {},
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed to update product",
                data: {},
              });
            }
          });
        }
      }
    );
  }
}
