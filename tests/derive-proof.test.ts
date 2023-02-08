import { assert } from 'chai';
import revealDocument from './vcs/reveal-document.json';
import guardianExampleVc from './vcs/guardian-example-meeco.json';
import { DefaultDocumentLoader, DocumentLoader } from '../src/index';
import {
    BbsBlsSignatureProof2020,
    deriveProof,
} from '@zkp-ld/jsonld-signatures-bbs';

describe('test bbs signature', function () {
    it('derive proof', async function () {
        const result = await deriveProof(guardianExampleVc, revealDocument, {
            suite: new BbsBlsSignatureProof2020(),
            documentLoader: DocumentLoader.build([new DefaultDocumentLoader()]),
        });

        assert.exists(result);
        console.log(JSON.stringify(result, null, 4));

        const credentialSubject = Array.isArray(result.credentialSubject)
            ? result.credentialSubject[0]
            : result.credentialSubject;

        assert.exists(credentialSubject.field1);
    });
});
