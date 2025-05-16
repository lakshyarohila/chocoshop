import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request:Request) {
    const requestData = await request.json();
    let validatedData;
    
    try {
        validatedData = await warehouseSchema.parse(requestData);
        
    } catch (error) {
        return Response.json({message:error},{status:400})
    }
    
    try {
        await db.insert(warehouses).values(validatedData)
        return Response.json({message:"ok its worked"},{status:201})
    } catch (error) {
        return Response.json({message:"failed to store in WareHouse",error},{status:500})
    }
    
}

export async function GET() {
    try {
        const allwarehouses = await db.select().from(warehouses);
        return Response.json(allwarehouses)
    } catch (error) {
        return Response.json({message:"faild to fetch",error})
    }
}