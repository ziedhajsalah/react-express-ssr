import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from './Article';

export default class ArticleList extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                {Object.values(this.props.articles).map((article) => (
                  <Article article={article} key={article.id} />
                ))}
              </div>
            )}
          />
          <Route
            path="/:id"
            render={({ match }) => (
              <Article article={this.props.articles[match.params.id]} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
