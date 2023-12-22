import {Request} from "@/utils/request"

const mockRequest = new Request({baseURL:'/mock'})




export const getCarbonIndex = (city)=>mockRequest.get(`/index?city=${city}`)
export const getCityState = (city)=>mockRequest.get(`/state?city=${city}`)
export const getAllCityIndex = ()=>mockRequest.get(`/getAllCityIndex`)

