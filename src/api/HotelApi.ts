import { HotelSearchResponse,  SearchParams } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchHotels = async(searchParams: SearchParams):Promise<HotelSearchResponse>=>{
    const queryParams = new URLSearchParams();
    queryParams.append("destination",searchParams.destination || "")
    queryParams.append("checkIn",searchParams.checkIn || "")
    queryParams.append("checkOut",searchParams.checkOut || "")
    queryParams.append("adultCount",searchParams.adultCount || "")
    queryParams.append("childCount",searchParams.childCount || "")
    queryParams.append("page",searchParams.page || "")

    queryParams.append("maxPrice",searchParams.maxPrice || "")
    queryParams.append("sortOption",searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility)=> queryParams.append("facilities",facility))
    searchParams.types?.forEach((type)=> queryParams.append("types",type))
    searchParams.stars?.forEach((star)=> queryParams.append("stars",star))
  
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
  
    if (!response.ok) {
      throw new Error("Failed to search hotels");
    }
  
    return response.json();
  }