"use client"

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png";
import user_logo from "@/assets/user_logo.png";
import logoutimg from "@/assets/logout.png";
import moon from "@/assets/modoEscuro.png";
import sunLight from '@/assets/sunClaro.png'
import logoutLight from '@/assets/sairClaro.png'
import userLight from '@/assets/userClaro.png'

import { useEffect, useState } from "react";

export const Header = ({ instructor }: { instructor: Boolean}) => {
  
  const [isDarkMode, setIsDarkMode] = useState(false); // controla o solzinho e a luazinha

  
  useEffect(() => {
    // verifica o localstorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); 
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  
  const handleToggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    if (newIsDarkMode) { // tema escuro
      document.documentElement.classList.add("dark"); 
      localStorage.setItem("theme", "dark");
    } else { // tema claro
      document.documentElement.classList.remove("dark"); 
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center w-[100%] bg-white shadow-md fixed top-0 dark:bg-black">
      <h1 className="ml-6">
        <Image src={ets_logo} width={100} height={100} alt="ets logo" />
      </h1>

      <div className="flex flex-grow gap-20 justify-end items-center mr-24">
        {instructor ? (
          <Link className="font-robFont text-blue2 dark:text-blue5 text-xl" href={ROUTES.admin}>
            Admin
          </Link>
        ) : (
          <></>
        )}
        <Link className="font-robFont dark:text-blue5 text-blue2 text-xl" href={ROUTES.home}>
          Home
        </Link>
        <Link className="font-robFont text-blue2 text-xl dark:text-blue5" href={ROUTES.forum}>
          Fórum
        </Link>
        <Link className="font-robFont text-blue2 text-xl dark:text-blue5" href={ROUTES.chat}>
          Chats
        </Link>
        <Link className="font-robFont text-blue2 text-xl dark:text-blue5" href={ROUTES.project}>
          Projetos
        </Link>

        <div onClick={handleToggleTheme} className="cursor-pointer">
          <Image
            src={isDarkMode ? sunLight : moon}
            width={33}
            height={33}
            alt="Modo de tema"
          />
        </div>

        <Link href={ROUTES.profile}>
          <Image src={isDarkMode ? userLight: user_logo} width={30} height={30} alt="Logo do usuário" />
        </Link>

        <Link href={ROUTES.login}>
          <Image src={isDarkMode? logoutLight :logoutimg} width={23} height={23} alt="Logout" />
        </Link>
      </div>
    </div>
  );
};
