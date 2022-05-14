# data-linker-js-sdk

This is the WIP javascript SDK for the [Data Linker](https://github.com/angelxmoreno/data-linker) service.

## Installation

```bash
yarn install angelxmoreno/data-linker-js-sdk
```

## Instantiation

```typescript
import {DataLinker} from "./DataLinker";
import axios from "axios";

// apiKey is required with `baseUrl` and `httpClient` being optional
const clientWithNoAxiosInstance = new DataLinker({
    apiKey: 'some-api-key',
    baseUrl: 'http://localhost:4000',
});

// if you want an augmented axios instance you can pass that instead 
const http = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 2000,
});

const clientWithAxiosInstance = new DataLinker({
    apiKey: 'some-api-key',
    httpClient: http,
});
```

## Usage

```typescript
import {DataLinker} from "./DataLinker";
import { Document, PlainTextPayload } from './types';

const options: DataLinkerOptions = {
    apiKey: 'some-api-key',
    baseUrl: 'http://localhost:4000',
}

const payload: PlainTextPayload = {
    classification: 'some/sample/classification',
    subjectId: 'some-subject-id',
    plainText: 'this is the plain text',
    fileName: 'sampleText.txt',
};

const client = new DataLinker(options);

client.sendPlainText(payload)
    .then((document:Document) => {
        console.log(`Document id is: ${document.id}`)
    });
```
