// ReadingListButton.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import ReadingListAddButtonComponent from './ReadingList/addToReadingListButton';
import ReadingListRemoveButtonComponent from './ReadingList/removeFromReadingListButton';
import { userReadingListArticleIds } from '../helperFunctions';
import { StateType } from '../typeDeclerations';

interface ReadingListButtonProps {
  articleId: number;
}

const ReadingListButton: React.FC<ReadingListButtonProps> = ({ articleId }) => {
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const readingList = useSelector((state: StateType) => state.readingList);

  const userArticleIds = userReadingListArticleIds(Object.values(readingList));

  if (userArticleIds.includes(articleId)) {
    return (
      <ReadingListRemoveButtonComponent
        articleId={articleId}
        userId={sessionUser.id}
      />
    );
  } else {
    return (
      <ReadingListAddButtonComponent
        articleId={articleId}
        userId={sessionUser.id}
      />
    );
  }
};

export default ReadingListButton;
