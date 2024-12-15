import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './BookList';
import BookList from './BookList';
import BookDetails from './BookDetails';



const RootStack = createNativeStackNavigator({
    screens: {
        BookList: BookList,
        BookDetails: BookDetails,
    },
});

export const Navigation = createStaticNavigation(RootStack);

