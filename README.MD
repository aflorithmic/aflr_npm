[![npm](https://img.shields.io/npm/v/aflr?style=for-the-badge)](https://www.npmjs.com/package/aflr)

# Aflorithmic NodeJS SDK

## Documentation

### Installation

`yarn add aflr` or `npm install --save aflr`

### Import and Usage

It can be used by a **singular import** or **modular imports**.

```javascript
import Aflr from "aflr";

Aflr.configure();

Aflr.Script.list();
```

```javascript
import Aflr, { Script, Voice, Speech } from "aflr";

Aflr.configure();

Script.list();
```

## Development notes

### How to push a new version

`npm version <version_type>`

version_type can be: `major`, `minor` or `patch`

then

`npm publish`
