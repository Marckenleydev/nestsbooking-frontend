import { useQuery } from "react-query";
import * as UserApi from "../api/UserApi";
import * as HotelApi from "../api/HotelApi";
import BookinggForm from "../BookingForm/BookinggForm";
import { useSearchContext } from "../context/SearchContext";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useParams } from "react-router";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const search = useSearchContext();
  const {hotelId} = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const {stripePromise} = useAppContext()

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);


  const {data:paymentIntentData}= useQuery("createPaymentIntent", ()=> HotelApi.createPaymeentIntent(hotelId as string, numberOfNights.toString()),
{
  enabled: !!hotelId && numberOfNights > 0
});



  const {data:hotel}= useQuery("fetchHotel",()=> HotelApi.fetchHotelById(hotelId as string),{
    enabled:!!hotelId
  } );
  const {data:currentUser} = useQuery("fetchCurrentUser", UserApi.getCurrentUser);
  
  if (!hotel) {
    return <></>;
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
     
      <BookingDetailsSummary
      checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel} />
       
      { currentUser && paymentIntentData &&(
        <Elements stripe={stripePromise} options={{clientSecret: paymentIntentData.clientSecret}}>
           <BookinggForm currentUser={currentUser}  paymentIntent={paymentIntentData}/>

        </Elements>
       
      ) }
      
    </div>
  )
}

export default Booking