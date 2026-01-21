import GlassyCard from '@/components/glassy-card';
import TableSkeleton from '@/components/table-skeleton';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import {
    Cell,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Header,
    HeaderGroup,
    Row,
    RowData,
    Table,
    type Table as TanstackTable,
    useReactTable,
} from '@tanstack/react-table';
import React, { JSX, useEffect } from 'react';
import Pagination from './pagination';
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    search?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
    emptyTitle?: string;
    emptyDescription?: string;
    withCard?: boolean;
}

function globalFilter<TData extends RowData>(row: Row<TData>, columnId: string, filterValue: string): boolean {
    if (!filterValue) return true;

    const search: string = filterValue.toLowerCase();

    return row.getAllCells().some((cell: Cell<TData, unknown>): boolean => {
        const meta = cell.column.columnDef.meta as { filterValue?: (row: TData) => string };
        const value: unknown = meta?.filterValue ? meta.filterValue(row.original) : cell.getValue();
        return String(value ?? '')
            .toLowerCase()
            .includes(search);
    });
}

function DataTable<T>({ columns, data, search, isLoading, icon, emptyTitle, emptyDescription, withCard = true }: DataTableProps<T>): JSX.Element {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table: Table<T> = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter: search,
        },
        globalFilterFn: globalFilter,
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 },
        },
        autoResetPageIndex: false,
    });

    const totalPages: number = Math.ceil(table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize);

    const extendedTable: TanstackTable<T> & {
        firstPage: () => void;
        lastPage: () => void;
        getCanPreviousPage: () => boolean;
        getCanNextPage: () => boolean;
    } = {
        ...table,
        firstPage: (): void => table.setPageIndex(0),
        lastPage: (): void => table.setPageIndex(totalPages - 1),
        getCanPreviousPage: (): boolean => table.getState().pagination.pageIndex > 0,
        getCanNextPage: (): boolean => table.getState().pagination.pageIndex < totalPages - 1,
    };

    useEffect(() => {
        const currentPageRows: Row<T>[] = table.getRowModel().rows;
        if (currentPageRows.length === 0 && table.getState().pagination.pageIndex !== 0) {
            table.setPageIndex(0);
        }
    }, [search, table]);

    const filteredRows: Row<T>[] = table.getRowModel().rows;
    const pageSize: number = table.getState().pagination.pageSize;

    const tableContent: JSX.Element = (
        <div className={`rounded-md border border-border shadow-xs ${!withCard ? 'mb-4' : ''}`}>
            <UITable className="table-auto rounded-md bg-card shadow-none">
                <TableHeader>
                    {table.getHeaderGroups().map(
                        (headerGroup: HeaderGroup<T>): JSX.Element => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: Header<T, unknown>): JSX.Element => {
                                    const headerContent: any =
                                        typeof header.column.columnDef.header === 'function'
                                            ? header.column.columnDef.header(header.getContext())
                                            : header.column.columnDef.header;

                                    const hasButton: boolean = React.Children.toArray(headerContent).some((child: any): boolean => {
                                        if (!child) return false;
                                        if (child.type === 'button') return true;
                                        return child.type?.displayName === 'Button' || child.type?.name === 'Button';
                                    });

                                    return (
                                        <TableHead key={header.id} className={hasButton ? '' : 'not-first:px-0 first:pr-0 last:pl-0'}>
                                            {headerContent}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ),
                    )}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: pageSize }).map((_, i: number): JSX.Element => <TableSkeleton key={i} columns={columns.length} />)
                    ) : filteredRows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                <Empty className="border border-dashed">
                                    <EmptyHeader>
                                        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                                        <EmptyTitle>No {emptyTitle?.toLowerCase()} found</EmptyTitle>
                                        <EmptyDescription>
                                            We couldn't find any {emptyDescription?.toLowerCase()} matching your search. Try adjusting your filters or
                                            search terms.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredRows.map(
                            (row: Row<T>): JSX.Element => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(
                                        (cell: Cell<T, unknown>): JSX.Element => (
                                            <TableCell key={cell.id} className="first:pl-4 last:pr-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ),
                                    )}
                                </TableRow>
                            ),
                        )
                    )}
                </TableBody>
            </UITable>
        </div>
    );

    return (
        <>
            {withCard ? <GlassyCard>{tableContent}</GlassyCard> : tableContent}
            <Pagination table={extendedTable} />
        </>
    );
}

export default DataTable;
