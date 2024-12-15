import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { mockBooks } from './mockBooks';
import { Book } from './types';
import { fetchBooksFailure, fetchBooksStart, fetchBooksSuccess, selectBook, setSearchQuery } from './redux/bookSlice';
import { RootState } from './redux/store';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

interface BookListProps {
    books: Book[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    fetchBooksStart: () => void;
    fetchBooksSuccess: (books: Book[]) => void;
    fetchBooksFailure: (error: string) => void;
    selectBook: (book: Book) => void;
    setSearchQuery: (query: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, isLoading, error, searchQuery, fetchBooksStart, fetchBooksSuccess, fetchBooksFailure, selectBook, setSearchQuery }) => {
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation(); // Use the navigation hook

    useEffect(() => {
        const fetchBooks = async () => {
            fetchBooksStart();
            try {
                // Simulating paginated data using mockBooks
                const booksPerPage = 10;
                const startIndex = (page - 1) * booksPerPage;
                const paginatedBooks = mockBooks.slice(startIndex, startIndex + booksPerPage);

                if (paginatedBooks.length < booksPerPage) {
                    setHasMore(false);
                }

                fetchBooksSuccess(paginatedBooks);
            } catch (err) {
                fetchBooksFailure('Failed to load books');
            }
        };

        fetchBooks();
    }, [page, fetchBooksStart, fetchBooksSuccess, fetchBooksFailure]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredBooks(books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            setFilteredBooks(books);
        }
    }, [searchQuery, books]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const loadMoreBooks = () => {
        if (hasMore && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderItem = ({ item }: { item: Book }) => (
        <TouchableOpacity
            style={styles.bookItem}
            onPress={() => {
                selectBook(item);
                navigation.navigate('BookDetails', { bookId: item.id }); // Navigate to BookDetails and pass book ID as parameter
            }}
        >
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={styles.bookDescription}>{item.description ? item.description.substring(0, 100) + '...' : 'No description available'}</Text>
        </TouchableOpacity>
    );

    if (isLoading && page === 1) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Search books by title"
                style={styles.searchInput}
            />
            <FlatList
                data={filteredBooks}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={loadMoreBooks}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" style={styles.loader} /> : null}
            />
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    books: state.books.books,
    isLoading: state.books.isLoading,
    error: state.books.error,
    searchQuery: state.books.searchQuery,
});

const mapDispatchToProps = {
    fetchBooksStart,
    fetchBooksSuccess,
    fetchBooksFailure,
    selectBook,
    setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    bookItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bookAuthor: {
        fontSize: 16,
        color: '#777',
        marginBottom: 8,
    },
    bookDescription: {
        fontSize: 14,
        color: '#555',
    },
    loader: {
        marginVertical: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
});
