import React from 'react';
import Article from './Article';

export default function ArticleList(props) {
  return (
    <div>
      {Object.values(props.articles).map((article) => (
        <Article
          actions={props.articleActions}
          article={article}
          key={article.id}
        />
      ))}
    </div>
  );
}
