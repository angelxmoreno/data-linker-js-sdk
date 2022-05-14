import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { DataLinkerOptions, Document, FilePayload, PlainTextPayload } from './types';

export class DataLinker {
    baseUrl: string;
    apiKey: string;
    httpClient: AxiosInstance;

    constructor({ apiKey, baseUrl, httpClient }: DataLinkerOptions) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || 'http://localhost';
        this.httpClient = httpClient || this.buildHttpClient();
    }

    protected buildHttpClient(): AxiosInstance {
        return axios.create({
            baseURL: this.baseUrl,
        });
    }

    public async sendPlainText(payload: PlainTextPayload): Promise<Document> {
        const requestConfig: AxiosRequestConfig = {
            method: 'POST',
            url: '/write/contents',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return this.send<Document>(requestConfig);
    }

    public async sendFile({ subjectId, classification, file }: FilePayload) {
        const data = new FormData();
        data.append('subjectId', subjectId);
        data.append('file', file);
        data.append('classification', classification);

        const requestConfig: AxiosRequestConfig = {
            method: 'POST',
            url: '/write/file',
            headers: {
                ...data.getHeaders(),
            },
            data,
        };

        return this.send<Document>(requestConfig);
    }

    protected async send<T>(config: AxiosRequestConfig): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `apikey:${this.apiKey}`,
            },
        };

        const { data } = await this.httpClient.request<T>(requestConfig);

        return data;
    }
}
