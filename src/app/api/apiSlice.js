import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../../features/auth/authSlice"


const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8080',
    credentials:'include',
    prepareHeaders:(headers, {getState})=>{
        const token = getState().auth.token
        if(token){
            headers.set("Authorization",`Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithReauth = async(args, api, extraOptions) =>{
    let results = await baseQuery(args,api, extraOptions)

    if (results?.error?.originalStatus === 403){
        console.log("Sending refresh token")

        //send a refresh token to get access to new token
        const refreshResult =await baseQuery( 
            "/refresh",
            api,
            extraOptions
        )
        console.log(refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.user
            //store the new token

            api.dispatch(setCredentials({...refreshResult.data,user}))
            //Retry the original query to get access to new token
            results = await baseQuery(args,api,extraOptions)
        }

        else{
            api.dispatch(logOut())
        }
    }

    return results
    
}

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder=>({ })
})