import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

class Article extends React.PureComponent {
  render() {
    const { article, author } = this.props;
    return (
      <div style={styles.article}>
        <Link to={`/${article.id}`} style={styles.title}>
          {article.title}
        </Link>
        <div style={styles.date}>{article.date}</div>
        <div style={styles.author}>
          <a href={author.website}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        <div style={styles.body}>{article.body}</div>
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};

const extraProps = (store, originalProps) => ({
  author: store.lookupAuthor(originalProps.article.authorId),
});

const ArticleContainer = storeProvider(extraProps)(Article);

export default ArticleContainer;

const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.85em',
    color: '#888',
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 20,
  },
};
