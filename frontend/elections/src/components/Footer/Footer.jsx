import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Replace with your logo path
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "الرئيسية",
    path: "/",
  },
  {
    title: "القوائم الإنتخابية",
    path: "/electoral",
  },
  {
    title: "من نحن",
    path: "/about",
  },
  {
    title: "تواصل معنا",
    path: "/contact",
  },
];

export const Footer = () => {
  return (
    <div className="text-white bg-[rgb(229,79,83)]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 pb-10 pt-5 text-right">
          {/* Company Details */}
          <div className="py-8 px-4 md:col-span-1">
            <h1 className="sm:text-3xl text-xl font-bold mb-3 flex items-center gap-3">
              <img
                src={logo}
                alt="VoteJO Logo"
                className="h-16 w-16 rounded-full"
              />
              <span>VoteJO</span>
            </h1>
            <p>
              في VoteJO، نؤمن بتقديم أفضل تجربة انتخابية للمواطنين الأردنيين.
              خدماتنا مصممة لتجعل العملية الانتخابية سلسة وفعالة.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:col-span-2">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold mb-3">
                  روابط هامة
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-gray-300 duration-300"
                      key={link.title}
                    >
                      <Link to={link.path}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold mb-3">
                  روابط أخرى
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-gray-300 duration-300"
                      key={link.title}
                    >
                      <Link to={link.path}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 flex justify-between mt-6 px-4">
            <div className="flex items-center gap-3">
              <a href="#">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>عمان، الأردن</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
