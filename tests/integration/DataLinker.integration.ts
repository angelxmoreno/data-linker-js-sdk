import { expect } from 'chai';
import 'mocha';
import { DataLinker } from '../../lib/DataLinker';
import { PlainTextPayload } from '../../lib/types';

const apiKey = '5Xj9qmPSVmsHWJ7XhPArzmhnJ3ZAYAYG';
const baseUrl = 'http://localhost:4000';

const plainTextPayload: PlainTextPayload = {
    classification: 'some/sample/classification',
    subjectId: 'some-subject-id',
    plainText: 'this is the plain text',
    fileName: 'sampleText.txt',
};

describe('DataLinker::integration', () => {
    describe('->sendPlainText', () => {
        it('receives an response', async () => {
            const dataLinker = new DataLinker({ apiKey, baseUrl });
            const document = await dataLinker.sendPlainText(plainTextPayload);
            expect(document.subjectId).to.eq(plainTextPayload.subjectId);
            expect(document.classification).to.eq(plainTextPayload.classification);
            expect(document.contentType).to.eq('text/plain');
        });
    });
});
