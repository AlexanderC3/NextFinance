import { GetFormatterForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
// import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request : Request) {
    const user = await currentUser()
    if(!user) redirect("/sign-in");

    // const {searchParams} = new URL(request.url)
    // const from = searchParams.get("from")
    // const to = searchParams.get("to")

    // const queryParams = OverviewQuerySchema.safeParse({
    //     from,
    //     to
    // })

    // if(!queryParams.success) {
    //     return Response.json(queryParams.error.message, {
    //         status: 400
    //     })
    // }

    // const transactions = await getTransactionsHistory(user.id, queryParams.data.from, queryParams.data.to)
    const transactions = await getTransactionsHistory(user.id)
    return Response.json(transactions)
}

export type GetTransactionsHistoryResponseType = Awaited<ReturnType<typeof getTransactionsHistory>>
// async function getTransactionsHistory(userId:string, from: Date, to: Date) {
async function getTransactionsHistory(userId:string) {
    const userSettings = await prisma.userSettings.findUnique({
        where: {
            userId
        }
    })
    if(!userSettings) {
        throw new Error("user settings not found")
    }

    const formatter = GetFormatterForCurrency(userSettings.currency)
    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            // date: {
            //     gte: from,
            //     lte: to
            // },
        },
        orderBy: {
            date: "desc"
        }
    })

    return transactions.map((transaction) => ({
        ...transaction, formattedAmount: formatter.format(transaction.amount)
    }))
}