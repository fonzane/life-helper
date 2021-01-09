import { Category } from "./category";

export interface Task {
    name: string;
    category: Category;
    dueDate?: string;
    createdAt?: Date;
    done?: boolean;
    userID: string;
}