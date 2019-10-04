import React, { useState, useEffect } from 'react';

import engine from './rules-engine';
import Rulesfactory from './rules-engine/factory';

const reducedChildProps = ({ rules, ...props }) => ({ ...props });

const Predicate = ({ store, child }) => {
  const { rules, children } = child.props;
  const RuleFactory = new Rulesfactory({ engine, rules });

  const [storeState, update] = useState(store);
  const [propState, updateProps] = useState(RuleFactory.applyRules(storeState));
  const props = reducedChildProps(child.props);

  useEffect(() => {
    updateProps(RuleFactory.applyRules(storeState));
  }, [storeState]);

  return React.cloneElement({ ...child, props }, { ...propState, update }, children);
};

export default ({ store, children }) => {
  const _children = React.Children.toArray(children);

  return React.Children.map(_children, (child) => {
    return (<Predicate child={child} store={store} />);
  });
};