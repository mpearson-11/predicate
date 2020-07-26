# Concept for Predicating reducer functions.

```js
const engine = require('./rules-engine');

const pageData = {
    app: {
        data: {
            page: 'Page 1'
        }
    }
};

const rules = [{
    pathTo: 'app.data.page',
    pathFor: 'page',
    selectorFn: (page) => `This is my ${page}`,
    fallback: 'page-1'
}];

const data = engine(pageData, rules);

console.log(data);

// Output: { page: 'This is my Page 1' }

```
