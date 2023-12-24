import {Request} from "@/utils/request"

const request = new Request({baseURL:'http://127.0.0.1:3007/api'})




export const getCarbonIndex = (city)=>request.get(`/index?city=${city}`)
export const getCityState = (city)=>request.get(`/state?city=${city}`)
export const getCityAmbition = (city)=>request.get(`/ambition?city=${city}`)
export const getAllCityIndex = ()=>request.get(`/score`)

