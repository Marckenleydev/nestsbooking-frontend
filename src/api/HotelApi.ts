import { BookingFormData, HotelSearchResponse,  HotelType,  PaymentIntentResponse,  SearchParams } from "../types";

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

   export const fetchHotelById = async(hotelId:string):Promise<HotelType>=>{
     const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
       method: "GET",
       
     });
   
     if (!response.ok) {
       throw new Error("Failed to fetch hotel");
     }
   
     return response.json();
   }
   
   export const createPaymeentIntent = async(hotelId:string, numberOfNights:string):Promise<PaymentIntentResponse>=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
       method: "POST",
       credentials: "include",
       body: JSON.stringify({numberOfNights}),
       headers: {
         "Content-Type": "application/json",
       },
     });
     if (!response.ok) {
       throw new Error("Failed to fetch payment intent");
     }

     return response.json();

   }

   export const createBooking = async(formData: BookingFormData)=>{
     const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
       method: "POST",
       credentials: "include",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
     if (!response.ok) {
       throw new Error("Failed to create booking");
     }

     return response.json();
   }


   export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return response.json();
  };