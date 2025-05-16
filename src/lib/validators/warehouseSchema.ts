import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string({ message: "Warehouse Product name is should be String" }),
  pincode: z.string({ message: "Pincode is required" }).length(6),
});
