import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

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
      <SearchBar key="1" doSearch={this.props.store.setSearchTerm} />,
      <ArticleList key="2" articles={articles} store={this.props.store} />,
    ];
  }
}
