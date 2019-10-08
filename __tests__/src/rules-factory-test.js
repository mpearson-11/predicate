import engine from '../../src/rules-engine';
import RulesFactory from '../../src/rules-engine/factory';

describe('rules factory', () => {
  const rules = [{
    pathTo: 'body.contact.name',
    pathFor: 'persona.name',
    fallback: 'You dont have a name!!!'
  }, {
    pathTo: 'body.persona.age.1',
    pathFor: 'persona.age',
    fallback: 'No Age!!!!'
  }];
  
  const Engine = new RulesFactory({ engine, rules });

  test('works', () => {
    const store = {
      body: {
        contact: { name: 'Max' },
        persona: { age: [19, 21] }
      }
    };

    const dataSet = Engine.applyRules(store);

    expect(dataSet).toEqual({
      persona: {
        name: 'Max',
        age: 21
      }
    });
  });
});
