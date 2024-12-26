import { FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 text-sm py-6 w-full">
      <div className="flex justify-center mb-4 space-x-6">
        <a href="#facebook" className="hover:text-gray-900">
          <FaFacebook size={20} />
        </a>
        <a href="#twitter" className="hover:text-gray-900">
          <FaTwitter size={20} />
        </a>
        <a href="#youtube" className="hover:text-gray-900">
          <FaYoutube size={20} />
        </a>
        <a href="#pinterest" className="hover:text-gray-900">
          <FaPinterest size={20} />
        </a>
        <a href="#instagram" className="hover:text-gray-900">
          <FaInstagram size={20} />
        </a>
      </div>
      <div className="text-center space-x-4 mb-2">
        <a href="#faq" className="hover:underline">FAQ</a>
        <a href="#terms" className="hover:underline">Terms</a>
        <a href="#privacy" className="hover:underline">Privacy</a>
        <a href="#press" className="hover:underline">Press</a>
        <a href="#affiliate" className="hover:underline">Affiliate Program</a>
        <a href="#housing" className="hover:underline">Fair Housing</a>
        <a href="#blog" className="hover:underline">Blog</a>
        <a href="#app" className="hover:underline">Download App</a>
        <a href="#find-room" className="hover:underline">Finding a Room</a>
        <a href="#rent-room" className="hover:underline">Renting out a Room</a>
      </div>
      <div className="text-center">
        UrbanNest &copy; 2024
      </div>
    </footer>
  );
}

export default Footer;
