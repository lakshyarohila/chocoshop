import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;
  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  // ✅ Fix filename formatting
  const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;
  const filePath = path.resolve(process.cwd(), "public/assets", filename); // ✅ Define filePath

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(filePath, buffer);
  } catch (error) {
    return Response.json({ message: "Failed to save file" ,error}, { status: 500 });
  }

  try {
    await db.insert(products).values({ ...validatedData, image: filename });
  } catch (error) {
    // ✅ Ensure filePath is correctly used
    await unlink(filePath).catch((err) => console.error("Failed to delete image:", err));
    return Response.json({ message: "Failed to store product in the database", error }, { status: 500 });
  }
  return Response.json({message:"Ok its Worked"},{status:201})
}

export async function GET() {
try {
    
    const allProducts = await db.select().from(products).orderBy(desc(products.id));
    return Response.json(allProducts)
} catch (error) {
    return Response.json({message:"Failed to fetch",error})
}
}

