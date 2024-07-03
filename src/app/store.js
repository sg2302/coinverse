import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi"; // Import the cryptoNewsApi

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // Add the cryptoNewsApi reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware), // Add the cryptoNewsApi middleware
});
