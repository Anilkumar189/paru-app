import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi=createApi({
    reducerPath:"postsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4000/posts',
        prepareHeaders:(headers,{getState})=>{
            var token = JSON.parse(window.localStorage.getItem('user')).token
            console.log("Token in Api",token)
            headers.set("token",token)
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getAllPosts:builder.query({
            query:()=>"/"
        })
    })
})
export const {useGetAllPostsQuery}=postsApi