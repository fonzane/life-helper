export interface Questionnaire {
    name: string;
    createdAt: Date;
    lastModified: Date;
    questions: Array<Question>;
    questionCount: number;
    weekdays: Array<string>;
    hour: number;
}

export interface Question {
    phrase: string;
    answer?: string | number;
    open: boolean;
}