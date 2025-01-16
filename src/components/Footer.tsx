
import { BsDiscord, BsTwitter, BsGithub, BsSlack } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import visa from '../assets/images/pay/pay.png';

const Footer = () => {
  return (
    <footer className="bg-blue-950 py-10 text-white ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contact Section */}
          <div className='text-white'>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <p className="mb-2 text-white"><strong >Address:</strong> Dubai Bussiness Bay, Naltex building, 2nd floor</p>
            <p className="mb-2 text-white"><strong>Phone:</strong> <a href="tel:+971555229" className="text-white">Call us at +971 55 5229</a></p>
            <p className="mb-4  text-white"><strong>Hours:</strong> From 8 a.m To 11 p.m</p>
            <p className="mb-2 text-white font-bold">Follow the developer</p>
            <div className="flex space-x-4 text-xl">
              <Link to="https://discord.com/channels/1027937184768081950/1027937184768081952" target="_blank" className=" ">
                <BsDiscord />
              </Link>
              <Link to="https://twitter.com/eclarkhalid" target="_blank" className=" ">
                <BsTwitter />
              </Link>
              <Link to="https://github.com/Eclarkhalid" target="_blank" className=" ">
                <BsGithub />
              </Link>
              <Link to="https://app.slack.com/client/T0195LMKD1R/D04QEBN1J80/rimeto_profile/U04PQHERFM1?cdn_fallback=2" target="_blank" className=" ">
                <BsSlack />
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">About</h2>
            <ul className="space-y-2">
              <li><Link to="/about" className=" ">About Us</Link></li>
              <li><Link to="/checkout" className=" ">Delivery</Link></li>
              <li><Link to="#" className=" ">Privacy Policy</Link></li>
              <li><Link to="#" className=" ">Terms & Conditions</Link></li>
              <li><Link to="#" className=" ">Fee Policy</Link></li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <ul className="space-y-2">
              <li><Link to="/login" className=" ">Profile</Link></li>
              <li><Link to="/cart" className=" ">View Reservation</Link></li>
              <li><Link to="/help" className=" ">Help</Link></li>
              <li><Link to="#" className=" ">Payments</Link></li>
              <li><Link to="#" className=" ">My Wishlist</Link></li>
              <li><Link to="#" className=" ">Coupons</Link></li>
            </ul>
          </div>

          {/* Install App Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Install App</h2>
            <p className="mb-4 text-white">Available on Google Play Services & App Store</p>
            
            <p className="mb-4 text-white">Payment Methods</p>
            <div>
              <Link to="https://www.paypal.com/signin" target="_blank">
                <img src={visa} alt="Payment Methods" className="h-12" />
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-white" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; Developed by Marckenley Developer 2023</p>
          <ul className="flex space-x-4">
            <li><Link to="#" className=" ">Privacy Policy</Link></li>
            <li><Link to="#" className=" ">Terms of Use</Link></li>
            <li><Link to="#" className=" ">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
