import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

export default class App extends Component {
  state = this.props.store.getState();
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
  componentWillUnMount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  };
  render() {
    let { articles, searchTerm } = this.state;
    if (searchTerm) {
      articles = pickBy(
        articles,
        (value) => value.title.match(searchTerm) || value.body.match(searchTerm)
      );
    }
    return [
      <Timestamp key="0" timestamp={this.state.timestamp} />,
      <SearchBar key="1" doSearch={this.props.store.setSearchTerm} />,
      <ArticleList key="2" articles={articles} store={this.props.store} />,
    ];
  }
}
