import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "Delivery Person Name In String" }),
  phone: z.string({message:"phone Number in String"}).length(13,"Provide The Phone Number with country like +91"),
  
});
