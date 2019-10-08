import React, { useState, useLayoutEffect } from 'react';

import engine from './rules-engine';
import Rulesfactory from './rules-engine/factory';

const __ = ({ rules, ...props }) => ({ ...props });

const Predicate = ({ store, child }) => {
  const { rules, children } = child.props;
  const rulesEngine = new Rulesfactory({ engine, rules });

  const [_store] = useState(store);
  const [state, update] = useState(rulesEngine.applyRules(_store));
  const props = __(child.props);

  useLayoutEffect(() => {
    update(rulesEngine.applyRules(_store));
  }, [store]);

  return React.cloneElement({ ...child, props }, { state, update }, children);
};

export default ({ store, children }) => {
  const _children = React.Children.toArray(children);

  return React.Children.map(_children, (child) => {
    return (<Predicate child={child} store={store} />);
  });
};