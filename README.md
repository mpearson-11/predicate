# MRulesEngine

A package for generating objects via a set of rules.

# Installation

```bash
npm install mrules-engine
```

---
### Standard Example:
```js
const engine = require('mrules-engine');

const exampleRules1 = [{
    pathTo: 'data.name',
    pathFor: 'name'
}];

const example1 = engine({ data: { name: 'Name' } }, exampleRules1);
console.log(example1);

> { name: 'Name' };

```

---
### selectorFn example
```js
const engine = require('mrules-engine');

const exampleRules2 = [{
    pathTo: 'data.name',
    pathFor: 'name'
    selectorFn: (name) => `My Name: ${name}`
}];

const example2 = engine({ data: { name: 'Name' } }, exampleRules2);
console.log(example2);

> { name: 'My Name: Name' };
```

---
### Fallback example

```js
const engine = require('mrules-engine');

const exampleRules3 = [{
    pathTo: 'data.nameDoesNotExist',
    pathFor: 'name',
    fallback: 'Fallback Name'
}];

const example3 = engine({ data: { name: 'Name' } }, exampleRules3);
console.log(example3);

> { name: 'Fallback Name' };
```

---
### Fallback with selectorFn example

```js
const engine = require('mrules-engine');

const exampleRules4 = [{
    pathTo: 'data.nameDoesNotExist',
    pathFor: 'name',
    selectorFn: (name) => `Your Fallback Name: ${name}`,
    fallback: 'Fallback Name'
}];

const example4 = engine({ data: { name: 'Name' } }, exampleRules4);
console.log(example4);

> { name: 'Your Fallback Name: Fallback Name' };
```

### Multiple Rules with selectorFn

```js
const engine = require('mrules-engine');

const exampleRules5 = [{
    pathTo: 'data.name',
    pathFor: 'name',
    selectorFn: (name) => `Forename: ${name}`
}, {
    pathTo: 'data.surname',
    pathFor: 'surname',
    selectorFn: (name) => `Surname: ${name}`
}];

const example5 = engine({ data: { name: 'Foo', surname: 'Bar' } }, exampleRules5);
console.log(example5);

> { name: 'Forename: Foo', surname: 'Surname: Bar'  };
```
