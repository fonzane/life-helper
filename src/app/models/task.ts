import { Category } from "./category";

export interface Task {
    name: string;
    categoryID?: string;
    category?: Category;
    dueDate?: string;
    createdAt?: Date;
    done?: boolean;
    userID: string;
    _id?: string;
}

// interface TaskArray{
//     [category: string]: {
//         name: string,
//         category: Category,
//         dueDate?: string,
//         createdAt?: Date,
//         done?: boolean,
//         userID: string;
//     }
// }