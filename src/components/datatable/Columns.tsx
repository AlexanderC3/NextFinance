import {ColumnDef} from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader"
import { cn } from "@/lib/utils"
import { GetTransactionsHistoryResponseType } from "@/app/api/transactions-history/route";
import { TransactionTableRowActions } from "./RowActions";

export function getTransactionColumns() {
    type TransactionHistoryRow = GetTransactionsHistoryResponseType[0]

    const columns : ColumnDef<TransactionHistoryRow>[] = [
        {
            accessorKey: "category",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Category" />
              ),
            filterFn: (row,id,value) => {
                return value.includes(row.getValue(id))
            },
            cell: ({row}) => (<div className="flex gap-2 capitalize">{row.original.categoryIcon}<div className="capitalize">{row.original.category}</div></div>)
        },
        {
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
              ),
            cell: ({row}) => (<div className="capitalize">{row.original.description}</div>)
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({row}) => {
                const date = new Date(row.original.date)
                const formattedDate = date.toLocaleDateString("default", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                })
                return (<div className="text-muted-foreground">{formattedDate}</div>)
            }
        },
        {
            accessorKey: "type",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Type" />
              ),
              filterFn: (row,id,value) => {
                return value.includes(row.getValue(id))
            },
            cell: ({row}) => (<div className={cn("capitalize rounded-lg text-center p-2", 
                row.original.type === "income" ? "bg-emerald-400/10 text-emerald-500" : "bg-rose-400/10 text-rose-500")}>{row.original.type}</div>)
        },
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Amount" />
              ),
            cell: ({row}) => (<div className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">{row.original.formattedAmount}</div>)
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => (<TransactionTableRowActions transaction={row.original}/>)
        }
    ];

    return columns
}