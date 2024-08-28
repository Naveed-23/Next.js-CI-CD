"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const token =( Math.random()*1000).toString();
    const userId = session?.user?.id;
    console.log(userId);

    if(!userId){
        return {
            message: "User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(userId),
            amount
        }
    });    

    return {
        message: "On ramp transaction added"
    }
}