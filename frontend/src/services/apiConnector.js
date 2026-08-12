
// apiConnector is a custom function that accepts the configuration parameters required to make an API request, such as the HTTP method, URL, body data, headers, and query parameters. It then creates an Axios configuration object and passes it to axiosInstance, which actually makes the API call.

import axios from "axios"

const axiosInstance=axios.create({});


export const  apiConnector=(method,url,bodyData,headers,params)=>{

    return axiosInstance({
        method,
        url,
        body:bodyData?bodyData:null,
        headers:headers ? headers:null,
        params:params?params:null
    });

}