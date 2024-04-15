import React from 'react';
import ReadingListRemoveButtonComponent from './ReadingList/removeFromReadingListButton';
import ReadingListAddButtonComponent from './ReadingList/addToReadingListButton';

interface ArticleType {
  // ... define the properties of ArticleType here
}

interface ReadingListItem {
  article: ArticleType;
  article_id: number;
  id: number;
  user_id: number;
}

interface ReadingListButtonProps {
  readingList: ReadingListItem[];
  articleId: number;
  userId: number;
}

const ReadingListButton: React.FC<ReadingListButtonProps> = ({ readingList, articleId, userId }) => {
    // Check if readingList is an array before calling map
    const userReadingListArticleId: number[] = Array.isArray(readingList) ? readingList.map(({ article_id }) => article_id) : [];

    if (userReadingListArticleId.includes(articleId)) {
      return <ReadingListRemoveButtonComponent articleId={articleId} userId={userId} />;
    } else {
      return <ReadingListAddButtonComponent articleId={articleId} userId={userId} />;
    }
  };

  export default ReadingListButton;
