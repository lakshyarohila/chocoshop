import {z} from 'zod'


export const productSchema = z.object({
name: z.string({message:"Product name is should be String"}),
image: z.instanceof(File,{message:"Product Image Must Be a image File"}),
description: z.string({message:"description is Must Be String"}),
price: z.number({message:"Product price must be a number"}),
})