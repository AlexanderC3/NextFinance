"use client"

import * as React from "react"
import { GetTransactionsHistoryResponseType } from "@/app/api/transactions-history/route"
import { useQuery } from "@tanstack/react-query"
import {ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import SkeletonWrapper from "@/components/SkeletonWrapper"
import { DataTableFacetedFilter } from "@/components/datatable/FacetedFilters"
import { DataTableViewOptions } from "@/components/datatable/ColumnToggle"
import { DataTablePagination } from "@/components/datatable/TablePagination"
import {download, generateCsv, mkConfig} from "export-to-csv"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { getTransactionColumns } from "@/components/datatable/Columns"

// interface Props {
//     from: Date,
//     to: Date
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emptyData:any[] = [];

const columns = getTransactionColumns();

const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true
})

// function TransactionTable({from,to} : Props) {
function TransactionTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    
    const history = useQuery<GetTransactionsHistoryResponseType>({
        // queryKey: ["transactions","history",from,to],
        // queryFn: () => fetch(`/api/transactions-history?from=${from}&to=${to}`).then((res) => res.json())
        queryKey: ["transactions","history"],
        queryFn: () => fetch(`/api/transactions-history`).then((res) => res.json())
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleExportCSV = (data : any[]) => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv) 
    }

    const table = useReactTable({
        data: history.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const categoriesOptions = React.useMemo(() => {
        const categoriesMap = new Map();
        history.data?.forEach((transaction) => {
            categoriesMap.set(transaction.category, {
                value: transaction.category,
                label: `${transaction.categoryIcon} ${transaction.category}`
            })
        })
        const uniqueCategories = new Set(categoriesMap.values())
        return Array.from(uniqueCategories)
    },[history.data])

  return (
    <div className="w-full">
        <div className="flex flex-wrap items-end justify-between gap-2 py-4">
            <div className="flex gap-2">
                {table.getColumn("category") && (
                    <DataTableFacetedFilter title="category" column={table.getColumn("category")} options={categoriesOptions} />
                )}
                {table.getColumn("type") && (
                    <DataTableFacetedFilter title="type" column={table.getColumn("type")} options={[
                        {label: "Income", value: "income"},
                        {label: "Expense", value: "expense"}
                    ]} />
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant={"outline"} size={"sm"} className="ml-auto h-8 lg:flex" onClick={() => {
                    const data = table.getFilteredRowModel().rows.map((row) => ({
                        category: row.original.category,
                        categoryIcon: row.original.categoryIcon,
                        description: row.original.description,
                        type: row.original.type,
                        amount: row.original.amount,
                        formattedAmount: row.original.formattedAmount,
                        date: row.original.date,
                    }));
                    handleExportCSV(data)
                }}>
                    <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
        <SkeletonWrapper isLoading={history.isFetching}>
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        )
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
        </div>
        <div className="pt-4">
            <DataTablePagination table={table}/>
        </div>
    </SkeletonWrapper>
  </div>
  )
}

export default TransactionTable