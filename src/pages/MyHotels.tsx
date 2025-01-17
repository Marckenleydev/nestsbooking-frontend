import { Link } from "react-router"
import * as MyHotelApi from "../api/MyHotelApi"
import { useQuery } from "react-query"
import { BsBuilding, BsMap } from "react-icons/bs"
import {BiHotel, BiMoney, BiStar } from "react-icons/bi"

function MyHotels() {
 
  const {data:hotelData, isLoading} = useQuery("fetchMyHotels", MyHotelApi.getMyHotels,{
    onError:()=>{


    }
  })
  if(isLoading){
    return  <div className="flex flex-col items-center justify-center  ">
    <p className="text-2xl font-semibold text-gray-700 mt-4">Loading...</p>
  </div>
  }
  if(!hotelData){
    return  <div className="flex flex-col items-center justify-center  ">
    <p className="text-2xl font-semibold text-gray-700 mt-4">No Hotels Found</p>
  </div>
  }

  return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link to="/add-hotel" className=" bg-blue-800 cursor-pointer py-2 px-6 text-white font-semibold hover:bg-blue-700" >Add Hotel</Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
          {hotelData.map((hotel)=>(
            <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
              <h2 className="text-2xl font-semibold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                  <BsMap className="mr-1"/>
                  {hotel.city}, {hotel.country}
                </div>

                <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                  <BsBuilding className="mr-1"/>
                  {hotel.type}
                </div>

                <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                  <BiMoney className="mr-1"/>
                  £{hotel.pricePerNight} per night
                </div>

                <div className="border border-slate-300 rounded-sm p-2 flex items-center">
                  <BiHotel className="mr-1"/>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>

                <div className="border border-slate-300 rounded-sm p-2 flex items-center w-c">
                  <BiStar className="mr-1"/>
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex justify-end">
                <Link  className=" bg-blue-800 cursor-pointer py-2 px-6 text-white font-semibold hover:bg-blue-700" to={`/edit-hotel/${hotel._id}`}>View Details</Link>

              </div>

            </div>
            
          ))}
        </div>
    </div>
  )
}

export default MyHotels