const ruleCreator = require('./creator');

const rules = [{
  pathTo: 'body.contact.name',
  pathFor: 'persona.name',
  fall: 'You dont have a name!!!'
}, {
  pathTo: 'body.persona.age.2',
  pathFor: 'persona.age',
  fall: 'No Age!!!!'
}];

const data = {
  body: {
    contact: { name: 'Max' },
    persona: { age: [19, 21] }
  }
};

const dataSet = ruleCreator(data, rules);

console.log(dataSet);
