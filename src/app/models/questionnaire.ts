export interface Questionnaire {
    name: string;
    createdAt?: Date;
    lastModified?: Date;
    questions: Array<Question>;
    userID: string;
    schedule: Schedule[];
    weekdays: Array<string>
}

export interface Question {
    phrase: string;
    answer?: string | number;
    open: boolean;
}

export interface Schedule {
    [key: string]: string;
}