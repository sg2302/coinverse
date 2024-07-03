import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders={
      'x-rapidapi-key': 'e6a06acbf1msh5ab5577f2fadac3p1023c6jsn92aa03338ccb',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
         getCryptos: builder.query({
               query:()=>createRequest('/stats')
         }),
         getCoins: builder.query({
               query:(count)=>createRequest(`/coins?limit=${count}`)
         }),
         getCoinDetails: builder.query({
            query:(coinId)=>createRequest(`/coin/${coinId}`)
         }),
         getCryptoHistory: builder.query({
            query:({coinId,timePeriod})=>createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
         })
    })
});

export const {
    useGetCryptosQuery,
    useGetCoinsQuery,
    useGetCoinDetailsQuery,
    useGetCryptoHistoryQuery
}=cryptoApi;