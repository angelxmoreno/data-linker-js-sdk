import { expect } from 'chai';
import 'mocha';
import { DataLinker } from '../lib/DataLinker';
import axios from 'axios';

const apiKey = 'some-api-key';
const baseUrl = 'https://example.com/api/v1';
const baseUrl2 = 'https://example.org/api/v2';
const httpClient = axios.create({ baseURL: baseUrl2 });

describe('DataLinker::constructor', () => {
    it('uses localhost when no base url is given', () => {
        const dataLinker1 = new DataLinker({ apiKey });
        expect(dataLinker1.baseUrl).to.equal('http://localhost');

        const dataLinker2 = new DataLinker({ apiKey, baseUrl });
        expect(dataLinker2.baseUrl).to.equal(baseUrl);
    });

    it('creates an axios client when none is given', () => {
        const dataLinker1 = new DataLinker({ apiKey, baseUrl });
        expect(dataLinker1.httpClient.defaults.baseURL).to.equal(baseUrl);

        const dataLinker2 = new DataLinker({ apiKey, baseUrl, httpClient });
        expect(dataLinker2.httpClient.defaults.baseURL).to.equal(baseUrl2);
    });
});
