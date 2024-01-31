
export interface IAccount {
    name: string;
    code?: string;
    isActive?: boolean;
    type: string;
    balance?: number;
    openingBalance?: number;
    closingBalance?: number;
    description?: string;
    parent_id?: string | undefined;
    isParent?: boolean;
}
