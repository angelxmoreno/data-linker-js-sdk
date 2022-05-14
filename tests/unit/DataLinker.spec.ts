import { expect } from 'chai';
import 'mocha';
import axios from 'axios';
import moxios = require('moxios');
import { Document, PlainTextPayload } from '../../src/types';
import { DataLinker } from '../../src/DataLinker';

const apiKey = 'some-api-key';
const baseUrl = 'https://example.com/api/v1';
const baseUrl2 = 'https://example.org/api/v2';
const httpClient = axios.create({ baseURL: baseUrl2 });
const plainTextPayload: PlainTextPayload = {
    classification: 'some/sample/classification',
    subjectId: 'some-subject-id',
    plainText: 'this is the plain text',
    fileName: 'sampleText.txt',
};
const sampleDoc: Document = {
    id: '7789f277-ee12-41b1-b88c-d9b860542eec',
    subjectId: 'foo',
    classification: 'random/sc',
    publisherId: '4d7b3b8d-07bc-4072-bcb2-78d032aeeab4',
    contentType: 'text/plain',
    fileName: 'bob.txt',
    filePath: 'uploads/ggpkwnpgpbtndvrqeejuaprrjjxfbbpg.txt',
    s3Path: 'data-linker:foo/random/sc/4d7b3b8d-07bc-4072-bcb2-78d032aeeab4/bob.txt',
    created: new Date('2022-05-13T21:44:53.606Z'),
};
describe('DataLinker::class', () => {
    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install(httpClient);
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall(httpClient);
    });

    describe('->constructor', () => {
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
    describe('->sendPlainText', () => {
        it('sends an expected request', () => {
            moxios.wait(async () => {
                const request = moxios.requests.mostRecent();
                const axiosResponse = await request.respondWith({
                    status: 200,
                    response: sampleDoc,
                });
                const config = axiosResponse.request.config;
                expect(config.headers['Content-Type']).to.eq('application/json');
                expect(config.headers['Authorization']).to.eq(`apikey:${apiKey}`);
                expect(config.method.toLowerCase()).to.eq('post');
                expect(config.baseURL).to.eq(baseUrl2);
                expect(config.url).to.eq('/write/contents');
                expect(JSON.parse(config.data)).to.eql(plainTextPayload);
            });

            const dataLinker = new DataLinker({ apiKey, baseUrl, httpClient });
            dataLinker.sendPlainText(plainTextPayload);
        });
    });
});
