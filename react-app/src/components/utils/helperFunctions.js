


//converts date from database format to usable format
export const articleDateConverter = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    });
};

// Truncates article body to no more than 150 characters for preview
export const articleBodyConverter = (body) => {
    return body.length > 150 ? `${body.substring(0, 150)}...` : body;
};

// Gets all article ids in user reading list
export const userReadingListArticleIds = (userReadingList)=> {
    return userReadingList.map(({ article_id }) => article_id);
};
