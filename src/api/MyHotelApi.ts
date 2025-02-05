
import {  HotelType } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addMyHotel = async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my/hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
      });
    
      if (!response.ok) {
        throw new Error("Failed to add hotel");
      }
    
      return response.json();

}

export const getMyHotels = async():Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my/hotels`, {
        method: "GET",
        credentials: "include",
        
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
    
      return response.json();

}


export const getMyHotelById = async(hotelId:string):Promise<HotelType>=>{
  const response = await fetch(`${API_BASE_URL}/api/my/hotels/${hotelId}`, {
    method: "GET",
    credentials: "include",
    
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }

  return response.json();
}

export const updateMyHotelById =async(hotelFormData: FormData)=>{

  const response = await fetch(`${API_BASE_URL}/api/my/hotels/${hotelFormData.get("hotelId")}`, {
    method: "PUT",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }

  return response.json();

}

