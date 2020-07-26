# MRulesEngine

A package for generating objects via a set of rules.

# Installation

```bash
npm install mrules-engine
```

## Example:
```js
const engine = require('./rules-engine');

const exampleRules1 = [{
    pathTo: 'data.name',
    pathFor: 'name'
}];

const example1 = engine({ data: { name: 'Name' } }, exampleRules1);
console.log(example1);

// Output: { name: 'Name' };

```

## Example with selectorFn
```js
const engine = require('./rules-engine');

const exampleRules2 = [{
    pathTo: 'data.name',
    pathFor: 'name'
    selectorFn: (name) => `My Name: ${name}`
}];

const example2 = engine({ data: { name: 'Name' } }, exampleRules2);
console.log(example2);

// Output: { name: 'My Name: Name' };
```

## Fallback Example:

```js
const engine = require('./rules-engine');

const exampleRules2 = [{
    pathTo: 'data.nameDoesNotExist',
    pathFor: 'name',
    fallback: 'Fallback Name'
}];

const example2 = engine({ data: { name: 'Name' } }, exampleRules2);
console.log(example2);

// Output: { name: 'Fallback Name' };
```

## Fallback with selectorFn Example:

```js
const engine = require('./rules-engine');

const exampleRules2 = [{
    pathTo: 'data.nameDoesNotExist',
    pathFor: 'name',
    selectorFn: (name) => `Your Fallback Name: ${name}`,
    fallback: 'Fallback Name'
}];

const example2 = engine({ data: { name: 'Name' } }, exampleRules2);
console.log(example2);

// Output: { name: 'Your Fallback Name: Fallback Name' };
```
