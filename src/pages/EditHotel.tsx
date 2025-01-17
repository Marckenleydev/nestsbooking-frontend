
import { useParams } from 'react-router'
import * as MyHotelApi from "../api/MyHotelApi"
import { useMutation, useQuery } from 'react-query';
import ManageHotelForm from '../ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../context/AppContext';
const EditHotel = () => {
    const {hotelId} = useParams();
    const {showToast}= useAppContext();
     const {data:hotelData, isLoading} = useQuery("fetchMyHotelById",()=> MyHotelApi.getMyHotelById(hotelId || ""),{
        enabled: !!hotelId
      })

      const {mutate} = useMutation(MyHotelApi.updateMyHotelById, {
        onSuccess:()=>{
            showToast({message: "Hotel updated successfully", type: "SUCCESS"})
           },
           onError: () => {
            showToast({ message: `Error updating Hotel`, type: "ERROR" });
          },
      });

      const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData);

      }

  return (
    <ManageHotelForm onSave={handleSave} hotel={hotelData} isLoading={isLoading} />
  )
}

export default EditHotel