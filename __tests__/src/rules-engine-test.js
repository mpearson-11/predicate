import rulesEngine from '../../src/rules-engine';

describe('rules engine', () => {
  test('works', () => {
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
});
