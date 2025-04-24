import { FormatNumber } from '@/lib/formatter';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Table {
    getState: () => { pagination: { pageIndex: number; pageSize: number } };
    getFilteredRowModel: () => { rows: any[] };
    setPageSize: (size: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
}

interface PaginationProps {
    table: Table;
}

const Pagination = ({ table }: PaginationProps) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const filteredRows = table.getFilteredRowModel().rows;
    const filteredTotalRows = filteredRows.length;

    const startRow = filteredTotalRows > 0 ? pageIndex * pageSize + 1 : 0;
    const endRow = filteredTotalRows > 0 ? Math.min(startRow + pageSize - 1, filteredTotalRows) : 0;

    return (
        <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2 place-self-start">
                <p className="text-nowrap">Rows per page</p>
                <Select name="page_row" onValueChange={(value) => table.setPageSize(Number(value))} value={String(pageSize)}>
                    <SelectTrigger id="page_row" className="w-16">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={String(pageSize)}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-4 place-self-end">
                <p className="text-nowrap">
                    Showing <span className="font-semibold">{FormatNumber(startRow)}</span> to{' '}
                    <span className="font-semibold">{FormatNumber(endRow)}</span> of{' '}
                    <span className="font-semibold">{FormatNumber(filteredTotalRows)}</span> entries
                </p>

                <div className="inline-flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.firstPage()} disabled={pageIndex === 0 || filteredTotalRows === 0}>
                        <ChevronsLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage() || filteredTotalRows === 0}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage() || filteredTotalRows === 0}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.lastPage()}
                        disabled={pageIndex === Math.ceil(filteredTotalRows / pageSize) - 1 || filteredTotalRows === 0}
                    >
                        <ChevronsRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
