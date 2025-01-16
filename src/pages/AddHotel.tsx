import { useMutation } from "react-query"
import ManageHotelForm from "../ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../context/AppContext";
import * as MyHotelApi from "../api/MyHotelApi"

const AddHotel = () => {
      const {showToast}= useAppContext();

    const {mutate, isLoading} = useMutation(MyHotelApi.addMyHotel,{

       onSuccess:()=>{
        showToast({message: "Hotel added successfully", type: "SUCCESS"})
       },
       onError: () => {
        showToast({ message: `Error saving Hotel`, type: "ERROR" });
      },

  
    });

    const handleSave = (hotelFormData: FormData) => {
      mutate(hotelFormData);
    };


  return (
   <ManageHotelForm onSave={handleSave} isLoading={isLoading}
   />
  )
}

export default AddHotel