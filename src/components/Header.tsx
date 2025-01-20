import {Link} from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import SignOutButton from "./SignOutButton"

function Header() {
  const {isLoggedIn}= useAppContext()

  return (
    <div className='bg-blue-950 py-6'>
        <div className="container mx-auto flex justify-between">
            <span className="text-2xl text-white font-semibold tracking-tight">
                <Link to="/">BookNest.com</Link>
            </span>

            <span className="flex space-x-2">
              {isLoggedIn ? <>
                <Link className="flex items-center text-white px-3 font-semibold hover:bg-blue-800" to="/my-bookings">My Bookings</Link>
                <Link className="flex items-center text-white px-3 font-semibold hover:bg-blue-800" to="/my-hotels">My Hotels</Link>


                <SignOutButton/>
                </> :
                 <> <Link className="text-blue-800 flex items-center px-3 font-semibold hover:bg-gray-100 bg-white cursor-pointer" to="/signin">Sign In</Link> </> }
                
               
                
            </span>

        </div>
    </div>
  )
}

export default Header