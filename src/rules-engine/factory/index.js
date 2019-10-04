export default class RulesEngineFactory {
  constructor({ engine, rules }) {
    this.rules = rules;
    this.engine = engine;
  }

  applyRules(store) {
    return this.engine(store, this.rules);
  }
}