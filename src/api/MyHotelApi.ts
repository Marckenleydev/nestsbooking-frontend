
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