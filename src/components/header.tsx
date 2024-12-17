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

const style= {
    option: "font-robCondensed text-blue2 text-[18px] hover:border-b-2 hover:border-blue1 dark:text-blue5"
}

export const Header = ({ instructor, toggleTheme }: { instructor: Boolean, toggleTheme: () => void }) => {
  
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
    
    return(
        <div className="flex items-center w-[100%] bg-white shadow-md fixed top-0 p-1">

            <h1 className="ml-6">
                <Image src={ets_logo} width={90} height={90} alt="ets logo"/>
            </h1>

            <div className="flex flex-grow gap-16 justify-end items-center mr-6">
                {instructor ? (
                    <Link className={style.option} href={ROUTES.admin}>Admin</Link>
                ) : (
                    <></>
                )}
                <Link className={style.option} href={ROUTES.home}>Home</Link>
                <Link className={style.option} href={ROUTES.forum}>Fórum</Link>
                <Link className={style.option} href={ROUTES.chat}>Chats</Link>
                <Link className={style.option} href={ROUTES.project}>Projetos</Link>
                <Link className={style.option} href={ROUTES.profile}>Profile</Link>
                <Link className={style.option} href={ROUTES.login}>Logout</Link>
        <div onClick={handleToggleTheme} className="cursor-pointer">
          <Image
            src={isDarkMode ? sunLight : moon}
            width={33}
            height={33}
            alt="Modo de tema"
          />
        </div>
      </div>
    </div>
  );
};
