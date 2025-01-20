import { useQuery } from "react-query";
import * as hotelApi from "../api/HotelApi";
import LatestDestinationCard from "../components/LatestDestinationCard";


const Home = () => {
  const { data: hotels,isLoading } = useQuery("fetchHotels", () =>
    hotelApi.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];
  if(isLoading){
    return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p> <div className="flex flex-col items-center justify-center  ">
    <p className="text-2xl font-semibold text-gray-700 mt-4">Loading...</p>
  </div>
  </div>)
  }
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;