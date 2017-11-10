import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

export default class App extends React.Component {
  appState = () => {
    const { articles, searchTerm } = this.props.store.getState();
    return { articles, searchTerm };
  };
  state = this.appState();
  static childContextTypes = {
    store: PropTypes.object,
  };
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  onStoreChange = () => {
    this.setState(this.appState());
  };
  render() {
    let { articles, searchTerm } = this.state;
    const searchRe = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(
        articles,
        (value) => value.title.match(searchRe) || value.body.match(searchRe)
      );
    }
    return [
      <Timestamp key="0" />,
      <SearchBar key="1" />,
      <Link to="/" key="2">
        Home
      </Link>,
      <ArticleList key="3" articles={articles} />,
    ];
  }
}
