import mongoose, { Schema, Document } from 'mongoose';

const questionnaireSchema: Schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: new Date() },
    lastModified: { type: Date, default: new Date() },
    questions: [{ phrase: String, open: Boolean }],
    weekdays: [{ type: String, required: true }],
    hour: Number,
    userID: String
});

export interface Questionnaire extends Document {
    name: string;
    createdAt: Date;
    lastModified?: Date;
    questions: Array<{phrase: string, open: boolean}>;
    weekdays: Array<string>;
    hour: number;
    userID: string;
}

export default mongoose.model<Questionnaire>('Questionnaire', questionnaireSchema);