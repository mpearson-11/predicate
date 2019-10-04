import React, { useState, useEffect } from 'react';

import engine from './rules-engine';
import Rulesfactory from './rules-engine/factory';

const __ = ({ rules, ...props }) => ({ ...props });

const Predicate = ({ store, child }) => {
  const { rules, children } = child.props;
  const Rules = new Rulesfactory({ engine, rules });

  const [_store] = useState(store);
  const [state, update] = useState(Rules.applyRules(_store));
  const props = __(child.props);

  useEffect(() => {
    update(Rules.applyRules(_store));
  }, [_store]);

  return React.cloneElement({ ...child, props }, { state, update }, children);
};

export default ({ store, children }) => {
  const _children = React.Children.toArray(children);

  return React.Children.map(_children, (child) => {
    return (<Predicate child={child} store={store} />);
  });
};