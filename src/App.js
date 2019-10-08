import React from 'react';
import PredicateRules from './PredicateRules';
import store from './store';

import './App.css';

const Page = ({ state, update }) => {
  const { name, timer, date } = state;

  setInterval(() => {
    update({ ...state, date: new Date() });
  }, timer);

  return (<h1>Page: {name}, Date: {date.toLocaleString()}</h1>);
};

const App = () => {
  const page1Rules = [{
    pathTo: 'data.app1.pageData.pageName',
    pathFor: 'name',
    fallback: 'No Page'
  }, {
    pathTo: 'data.app1.pageData.timer',
    pathFor: 'timer',
    fallback: 0
  },
  {
    pathTo: 'data.app1.pageData.date',
    pathFor: 'date',
    fallback: 0
  }];

  const page2Rules = [{
    pathTo: 'data.app2.pageData.pageName',
    pathFor: 'name',
    fallback: 'No Page'
  }, {
    pathTo: 'data.app2.pageData.timer',
    pathFor: 'timer',
    fallback: 0
  }, {
    pathTo: 'data.app2.pageData.date',
    pathFor: 'date',
    fallback: 0
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
