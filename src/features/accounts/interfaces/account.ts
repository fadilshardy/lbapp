
export interface IAccount {
    name: string;
    code?: string;
    isActive?: boolean;
    type: string;
    balance?: number;
    openingBalance?: number;
    closingBalance?: number;
    description?: string;
    parentId?: string | undefined;
    isParent?: boolean;
}
