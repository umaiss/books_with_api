import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import { Book } from './types';

interface BookDetailsProps {
    selectedBook: Book | null;
}

const BookDetails: React.FC<BookDetailsProps> = ({ selectedBook }) => {
    if (!selectedBook) {
        return <Text>No book selected.</Text>;
    }

    return (
        <View>
            <Text>Title: {selectedBook.title}</Text>
            <Text>Author: {selectedBook.author}</Text>
            <Text>Description: {selectedBook.description}</Text>
            <Text>Publish Date: {selectedBook.publishDate}</Text>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedBook: state.books.selectedBook,
});

export default connect(mapStateToProps)(BookDetails);
