import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loansApi=createApi({
    reducerPath:"loansApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4000/',
        prepareHeaders:(headers,{getState})=>{
            var token =JSON.parse(window.localStorage.getItem('user')).token
            
            console.log("Token in Api",token)
            headers.set("token",token)
            return headers;
        }
    }),
    endpoints:(builder)=>({

        getAllLoanTypes:builder.query({
            query:()=>"/loanTypes"
        }),

        getAllLoans:builder.query({
            query:()=>"/loans"
        }),

        getLoanByMobile:builder.query({
            query:(mobile)=>`loans?customerMobile=${mobile}`
        }),

        addLoan:builder.mutation({
            query:(loan)=>{
                return{
                    url:"/loans",
                    method:"POST",
                    body:loan
                }
            }
        }),

      addUser:builder.mutation({
        query:(user)=>{
            return{
                url:"/users",
                method:"POST",
                body:user
            }
        }
      }),

        updateLoan:builder.mutation({
            query:(loan)=>{
                return{
                    url:`/loans/${loan.id}`,
                    method:"PUT",
                    body:loan
                }
            }
        })
    })
})
export const {useGetAllLoanTypesQuery,
    useAddLoanMutation,
    useGetAllLoansQuery,
    useUpdateLoanMutation,
    useAddUserMutation,
    useGetLoanByMobileQuery
}=loansApi