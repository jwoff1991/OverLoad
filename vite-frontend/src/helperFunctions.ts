import { ReadingListItem } from "./typeDeclerations";


//converts date from database format to usable format
//data normalization
export const articleDateConverter = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    });
};

// Truncates article body to no more than 150 characters for preview
export const articleBodyConverter = (body: string): string => {
    return body.length > 150 ? `${body.substring(0, 150)}...` : body;
};

// Gets all article ids in user reading list
export const userReadingListArticleIds = (userReadingList: ReadingListItem[]): number[] => {
    return userReadingList.map(({ article_id }) => article_id);
};


export const validateField = (field: string, message: string) => {
    if (!field.trim()) {
      return message;
    }
    return null;
  };


export const createErrorObject = (error: unknown) => ({
  message: error instanceof Error ? error.toString() : "An error occurred",
});
