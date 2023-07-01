import { useState } from 'react';

export const useModalToggle = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const handleModalToggle = (open: boolean) => {
        setIsOpen(open);
    };

    return { isOpen, handleModalToggle };
};

