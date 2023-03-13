import React from "react";
import { FaGithub, FaInstagram, FaLinkedin,} from 'react-icons/fa';




export const Footer = () => {
  return (
   
    <footer className="text-center border-t border-gray-300 pt-4 mt-4">
    <p className="font-bold text-lg mb-2"> Goggl 👓 Clone Project  by Arpan</p>
    <div className="flex justify-center items-center ">
      <a href="https://www.instagram.com/theselftaught.dev/" target="_blank" rel="noreferrer"><FaInstagram className="text-gray-400 hover:text-gray-600 mx-4 my-4 text-2xl" /></a>
      <a href="https://github.com/arpan-pro-learner" target="_blank" rel="noreferrer"><FaGithub className="text-gray-400 hover:text-gray-600 mx-4 my-4 text-2xl" /></a>
      <a href="https://www.linkedin.com/in/webdevarpan/" target="_blank" rel="noreferrer"><FaLinkedin className="text-gray-400 hover:text-gray-600 mx-4 my-4 text-2xl" /></a>
      
    </div>
  </footer>

  );
};
