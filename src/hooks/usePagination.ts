import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(32);

    const handlePagination = (page) => {
        setPage(page);
    };

    const handlePerPage = (perPage) => {
        setPerPage(perPage);
        setPage(1);
    }

    return { page, handlePagination, perPage, handlePerPage }
}