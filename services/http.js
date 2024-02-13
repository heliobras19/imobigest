import axios from "axios"
import { destroyCookie, parseCookies } from "nookies"


export function getApiClient(ctx) {

    //console.log('contexto', ctx)

    const { "pepp.token": token } = parseCookies(ctx)

    //console.log('URL RAIZ', process.env.API_URL)

    const api = axios.create({
        baseURL:  process.env.NEXT_PUBLIC_API_URL,
        // baseURL: "https://intelligenz.brindes.ajung.site/api",
       //  baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Content-Type": "application/json",
            // "apiKey": "VQlIAZnnwKFMY2NKNrfgkg3uPj4A5n",
            "apiKey": process.env.NEXT_PUBLIC_API_KEY,
        }
    })

    api.interceptors.request.use(config => {
        // console.log(config)
        return Promise.resolve(config)
    })
    
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api
}