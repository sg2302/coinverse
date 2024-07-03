import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders={
    'x-rapidapi-key': 'e6a06acbf1msh5ab5577f2fadac3p1023c6jsn92aa03338ccb',
    'x-rapidapi-host': 'google-news13.p.rapidapi.com'
}

const baseUrl='https://google-news13.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoNewsHeaders})

export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
         getCryptoNews: builder.query({
               query:({keyword})=>createRequest(`/search?keyword=${keyword}&lr=en-US`)
         })
    })
});

export const {
    useGetCryptoNewsQuery,
}=cryptoNewsApi;