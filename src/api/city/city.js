import {Request} from "@/utils/request"

const request = new Request({baseURL:''})




export const getCarbonIndex = (city)=>request.get(`/api/index?city=${city}`)
export const getCityState = (city)=>request.get(`/api/state?city=${city}`)
export const getCityAmbition = (city)=>request.get(`/api/ambition?city=${city}`)
export const getEmissionTrend = (city)=>request.get(`/api/tuogou?city=${city}`)
export const getAllCityIndex = ()=>request.get(`/api/score`)


export const getNppFile = (year)=>request.get(`/download/npp/${year}.tif`,{ responseType: 'blob'})