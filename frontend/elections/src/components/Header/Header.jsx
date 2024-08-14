import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-[rgb(229,79,83)] p-4 text-white shadow-md">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
          <span className="mr-2 text-xl font-bold text-white">VoteJO</span>
        </div>
        <div className="flex space-x-14">
          <Link to="/" className="hover:text-gray-300 ml-12">
            الرئيسية
          </Link>
          <Link to="/electoral" className="hover:text-gray-300">
            القوائم الإنتخابية
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            من نحن
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            تواصل معنا
          </Link>
        </div>
        <div>
          <Link
            to="/signin"
            className="bg-[rgb(41,180,115)] text-white px-4 py-2 rounded"
          >
            تسجيل الدخول
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
