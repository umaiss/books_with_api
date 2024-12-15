export const mockBooks = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Book Title ${index + 1}`,
    author: `Author ${index + 1}`,
    description: `This is the description for Book Title ${index + 1}`,
    publishDate: `202${index % 10}-01-01`,
}));
