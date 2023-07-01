import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handlePagination = (page: number) => {
        setPage(page);
    };

    const handlePerPage = (perPage: number) => {
        setPerPage(perPage);
        setPage(1);
    }

    return { page, handlePagination, perPage, handlePerPage }
}