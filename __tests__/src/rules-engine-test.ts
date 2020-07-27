const rulesEngine = require('../../src/rules-engine');

describe('rules engine', () => {
  test('return {} for incorrect type of rules or data', () => {
    expect(rulesEngine(null, {})).toEqual({});
    expect(rulesEngine('', {})).toEqual({});
    expect(rulesEngine(undefined, {})).toEqual({});

    expect(rulesEngine({}, null)).toEqual({});
    expect(rulesEngine(null, null)).toEqual({});
    expect(rulesEngine('', null)).toEqual({});

    expect(rulesEngine(null, '')).toEqual({});
    expect(rulesEngine({}, '')).toEqual({});
    expect(rulesEngine('', '')).toEqual({});

    expect(rulesEngine(null, undefined)).toEqual({});
    expect(rulesEngine({}, undefined)).toEqual({});
    expect(rulesEngine('', undefined)).toEqual({});
  });

  test('returns cloned object', () => {
    const rules = [{
      pathTo: 'someObjectData.person',
      pathFor: 'aPerson',
      selectorFn: (data: any) => {
        data.name = 'Changed Name';
        return data;
      }
    }];

    const pageData = {
      someObjectData: {
        person: {
          name: 'Max'
        }
      }
    };

    const dataSet = rulesEngine(pageData, rules);
    expect(dataSet).toEqual({ aPerson: { name: 'Changed Name' } });
    expect(pageData.someObjectData.person.name).toBe('Max'); // expect original isn't changed
  });

  test('returns cloned array', () => {
    const rules = [{
      pathTo: 'someArrayData',
      pathFor: 'newSomeData',
      selectorFn: (ar: any) => {
        ar.pop();
        return ar;
      }
    }];

    const pageData = {
      someArrayData: ['a', 'b', 'c']
    };

    const dataSet = rulesEngine(pageData, rules);
    expect(dataSet).toEqual({ newSomeData: ['a', 'b'] });
    expect(pageData.someArrayData.length).toBe(3); // expect original isn't changed
  });

  test('returns null for badly formatted rules', () => {
    const pageData = {
      app: true
    };

    const rules = [{
      pathTo: 'app.0',
      pathFor: 'first',
    }, {
      pathTo: 'app.1',
      pathFor: 'second',
    }];

    const dataSet = rulesEngine(pageData, rules);
    expect(dataSet).toEqual({ first: null, second: null });
  });

  test('returns an array of items', () => {
    const pageData = {
      app: {
        data: {
          page: 'Page 1'
        }
      },
      banana: 'I AM A BANANA',
      apple: 'I AM AN APPLE',
    };

    const rules = [{
      pathTo: 'banana',
      pathFor: 'fruits.0'
    },
    {
      pathTo: 'apple',
      pathFor: 'fruits.1'
    }];

    const dataSet = rulesEngine(pageData, rules);
    expect(dataSet).toEqual({ fruits: ['I AM A BANANA', 'I AM AN APPLE'] });
  });
  test('returns correct rule data for selectorFun', () => {
    const pageData = {
      app: {
        data: {
          page: 'Page 1'
        }
      }
    };

    const rules = [{
      pathTo: 'app.data',
      pathFor: 'data',
      selectorFn: (params: any) => ({ ...params, page: `This is my ${params.page}` }),
      fallback: 'page-1'
    }];

    const dataSet = rulesEngine(pageData, rules);
    expect(dataSet).toEqual({ data: { page: 'This is my Page 1' } });
  });

  test('returns correct rule data', () => {
    const rules = [{
      pathTo: 'body.contact.name',
      pathFor: 'persona.name',
      fallback: 'You dont have a name!!!'
    }, {
      pathTo: 'body.persona.age.1',
      pathFor: 'persona.age',
      fallback: 'No Age!!!!'
    }];

    const data = {
      body: {
        contact: { name: 'Max' },
        persona: { age: [19, 21] }
      }
    };

    const dataSet = rulesEngine(data, rules);
    expect(dataSet).toEqual({
      persona: {
        name: 'Max',
        age: 21
      }
    });
  });

  test('returns with fallbacks', () => {
    const rules = [{
      pathTo: 'body.contact.name',
      pathFor: 'persona.name',
      fallback: 'You dont have a name!!!'
    }, {
      pathTo: 'body.persona.age.1',
      pathFor: 'persona.age',
      fallback: 'No Age!!!!'
    }];

    const dataSet = rulesEngine({}, rules);
    expect(dataSet).toEqual({
      persona: {
        age: 'No Age!!!!',
        name: 'You dont have a name!!!'
      }
    });
  });

  test('returns without fallbacks', () => {
    const rules = [{
      pathTo: 'body.contact.name',
      pathFor: 'persona.name'
    }, {
      pathTo: 'body.persona.age.1',
      pathFor: 'persona.age'
    }];

    const dataSet = rulesEngine({}, rules);
    expect(dataSet).toEqual({
      persona: {
        age: null,
        name: null
      }
    });
  });
});
