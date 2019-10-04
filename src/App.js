import React from 'react';
import PredicateRules from './PredicateRules';
import store from './store';

import './App.css';

const Page = ({ name, style }) => {
  return (<h1 style={style}>{name}</h1>);
};

const App = ({ }) => {
  const page1Rules = [{
    pathTo: 'data.someCMS1.data.pageName.name',
    pathFor: 'name',
    fallback: 'No Page'
  }, {
    pathTo: 'data.someCMS1.style',
    pathFor: 'style',
    fallback: {}
  }];

  const page2Rules = [{
    pathTo: 'data.someCMS2.data.pageName.name',
    pathFor: 'name',
    fallback: 'No Page'
  }, {
    pathTo: 'data.someCMS2.style',
    pathFor: 'style',
    fallback: {}
  }];

  return (
    <div className="App">
      <PredicateRules store={store}>
        <Page rules={page1Rules}>Another Page</Page>
        <Page rules={page2Rules}>Another Page</Page>
      </PredicateRules>
    </div>
  );
}

export default App;
