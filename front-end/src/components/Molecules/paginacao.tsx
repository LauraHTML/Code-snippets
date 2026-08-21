import { useState, useEffect, ReactNode } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/src/components/ui/pagination";
import Image from 'next/image';

interface ControlePaginacaoProps<T> {
    items?: T[];
    renderItem: (item: T) => ReactNode;
    itemsPerPage?: number;
    gridClassName?: string;
    showInfo?: boolean;
}

export function ControlePaginacao<T>({
    items = [],
    renderItem,
    itemsPerPage = 9,
    gridClassName = "grid gap-4 md:grid-cols-2 lg:grid-cols-[auto_auto]",
    showInfo = false
}: ControlePaginacaoProps<T>) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [items.length]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } 
            else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } 
            else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col gap-3 text-center py-12 text-muted-foreground items-center">
                Nenhuma receita encontrada
            </div>
        );
    }

    const handlePageChange = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-6">
            <div className={gridClassName}>
                {currentItems.map((item) => renderItem(item))}
            </div>

            {showInfo && items.length > itemsPerPage && (
                <div className="text-sm text-muted-foreground text-center">
                    Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, items.length)} de {items.length} itens
                </div>
            )}

            {items.length > itemsPerPage && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                                {page === '...' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        onClick={() => handlePageChange(page)}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
