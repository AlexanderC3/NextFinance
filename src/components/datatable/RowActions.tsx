import { GetTransactionsHistoryResponseType } from "@/app/api/transactions-history/route";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import DeleteTransactionDialog from "@/app/(pages)/(dashboard)/transactions/_components/DeleteTransactionDialog";


type TransactionHistoryRow = GetTransactionsHistoryResponseType[0]
export function TransactionTableRowActions({transaction} : {transaction : TransactionHistoryRow}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    return(
        <>
            <DeleteTransactionDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} transactionId={transaction.id} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2" onSelect={() => {setShowDeleteDialog((prev) => !prev)}}>
                        <TrashIcon className="h-4 w-4 text-muted-foreground"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}