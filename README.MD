# THIS PACKAGE IS DEPRECATED. PLEASE USE `"apiaudio"` PACKAGE INSTEAD.

# Javascript SDK

## Documentation

### Installation

`yarn add aflr` or `npm install --save aflr`

### Import and Usage

It can be used by a **singular import** or **modular imports**.

```javascript
import Aflr from "aflr";

Aflr.configure(...);

Aflr.Script.list();
```

```javascript
import Aflr, { Script, Voice, Speech } from "aflr";

Aflr.configure(...);

Script.list();
```

### **A detailed documentation can be found on [docs.api.audio](https://docs.api.audio)**

## Development notes

### How to push a new version

`npm version <version_type>`

version_type can be: `major`, `minor` or `patch`

then

`npm publish`

### Running tests

To be able to run the tests, create a `.env` file and put a valid `API_KEY` parameter in it. Also see `test-config.ts` file.
