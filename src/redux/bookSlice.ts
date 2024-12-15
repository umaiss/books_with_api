import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BookState {
    books: Book[];
    selectedBook: Book | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: BookState = {
    books: [],
    selectedBook: null,
    isLoading: false,
    error: null,
    searchQuery: '',
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        fetchBooksStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchBooksSuccess: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload;
            state.isLoading = false;
        },
        fetchBooksFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        selectBook: (state, action: PayloadAction<Book | null>) => {
            state.selectedBook = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

// Exporting actions from slice
export const {
    fetchBooksStart,
    fetchBooksSuccess,
    fetchBooksFailure,
    selectBook,
    setSearchQuery,
} = bookSlice.actions;

// Exporting the reducer (automatically generated by Redux Toolkit)
export default bookSlice.reducer;
