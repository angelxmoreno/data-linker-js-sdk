import { ReadStream } from 'fs';
import { AxiosInstance } from 'axios';

interface SendPayload {
    subjectId: string;
    classification: string;
}

export interface PlainTextPayload extends SendPayload {
    fileName: string;
    plainText: string;
}

export interface FilePayload extends SendPayload {
    file: ReadStream;
}

export type DataLinkerOptions = {
    apiKey: string;
    baseUrl?: string;
    httpClient?: AxiosInstance;
};

export type Document = {
    id: string;
    subjectId: string;
    classification: string;
    publisherId: string;
    contentType: string;
    fileName: string;
    filePath: string;
    s3Path: string;
    created: Date;
};
