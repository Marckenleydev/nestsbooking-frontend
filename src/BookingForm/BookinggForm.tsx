import { useForm } from "react-hook-form"
import { BookingFormData, PaymentIntentResponse, UserType } from "../types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { useMutation } from "react-query"
import * as HotelApi from "../api/HotelApi";
import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router"
import { useSearchContext } from "../context/SearchContext"
type Props ={
    currentUser: UserType,
    paymentIntent: PaymentIntentResponse
}


const BookinggForm = ({currentUser, paymentIntent}:Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const { showToast } = useAppContext();
    const { mutate: bookRoom, isLoading } = useMutation(HotelApi.createBooking
        ,
        {
          onSuccess: () => {
            showToast({ message: "Booking Saved!", type: "SUCCESS" });
          },
          onError: () => {
            showToast({ message: "Error saving booking", type: "ERROR" });
          },
        }
      );
    

    const {handleSubmit,register} = useForm<BookingFormData>({
        defaultValues:{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        } ,
    });

    const onSubmit = async (formData: BookingFormData) => {
        console.log(formData)
        if (!stripe || !elements) {
          return;
        }
    
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        });
    
        if (result.paymentIntent?.status === "succeeded") {
          bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
        }
      };
  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
     className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
        <span className="font-semibold text-xl">Confirm Your Details</span>
        <div className="grid grid-cols-2 gap-2">
            <label className="text-gray-700 text-sm font-semibold fex-1">
                First Name
                <input
                readOnly
                disabled
                    className="border capitalize mt-1 rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                    type="text"
                    {...register("firstName", {
                        required: "First Name is required",
                    })}
                />
            </label>

            <label className="text-gray-700 text-sm font-semibold fex-1">
                Last Name
                <input
                readOnly
                disabled
                    className="border mt-1 capitalize rounded w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                    type="text"
                    {...register("lastName", {
                        required: "Last Name is required",
                    })}
                />
            </label>

            <label className="text-gray-700 text-sm font-semibold flex-1">
                Email
                <input
                readOnly
                disabled
                    className="border mt-1 rounded  w-full py-2 px-3 font-normal text-gray-700 bg-gray-200"
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                        
                    })}
                />
            </label>
        </div>

        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>
            <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
                Total Cost: £{paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs">Include taxes and charges</div>
        </div>
        </div>

        <div className="space-y-2">
            <h3 className="text-xl font-semibold">
                Payment Details
            </h3>
            <CardElement
              options={{
               
                hidePostalCode: true, // Hides the ZIP code field
              }}
             id="payment-elemnt" className="border rounded-md p-2 text-sm" />

        </div>
        <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className=" bg-blue-800 cursor-pointer py-2 px-6 text-white font-semibold hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>

    
    </form>
  )
}

export default BookinggForm