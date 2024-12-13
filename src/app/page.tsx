"use client"

import React, { useState } from "react";
import logo from "@/assets/logo_azul.png";
import check from "@/assets/checked.png";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";

interface ReturnBack {
  token: string;
  instructor: number;
  id: number;
}

export default function Home() {
  const [auth, setAuth] = useState({ edv: "", password: "" });

  const style = {
    firstDiv: "w-1/4 md:w-1/3  h-4/5",
    secondDiv: "bg-white w-1/4 md:w-1/3  rounded-[8px] flex flex-col items-center justify-center h-4/5 gap-10",
    principalDiv: "bg-blue1 h-screen flex flex-row w-[100%] justify-center pt-20 pb-20 items-center gap-12",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data: ReturnBack = await response.json();
      console.log("Token recebido:", data.token);

      // Redirecionar ou salvar o token
      localStorage.setItem("token", data.token); // Exemplo de salvamento
      localStorage.setItem("id", data.id.toString()); // Exemplo de salvamento
      alert("Login bem-sucedido!");
      window.location.href = ROUTES.home;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <div className={style.principalDiv}>
      <div className={style.firstDiv}>
        <div className="flex flex-row items-center gap-5">
          <Image src={logo} alt="img" />
          <h1 className="font-robFont text-white text-[24px]">
            Engineering<br /> Technical<br /> School
          </h1>
        </div>
        <div className="flex flex-col gap-3 m-10">
          <h1 className="font-robFont text-white text-[26px]">Welcome to ETS</h1>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-white text-[20px]">Start your career</h3>
          </div>
          {/* Outros elementos omitidos por brevidade */}
        </div>
      </div>
      <div className={style.secondDiv}>
        <h1 className="font-robFont text-blue0 font-bold text-[35px]">Login</h1>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="edv" className=" font-robFont w-[80%] text-start font-bold text-blue0">
            Edv
          </label>
          <input
            type="text"
            name="edv"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="type your edv..."
            value={auth.edv}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="password" className="font-robFont w-[80%] text-start font-bold text-blue0">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="type your pass..."
            value={auth.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue1 w-[80%] p-2 text-white rounded-[8px] font-robFont text-center"
        >
          Sign In
        </button>
        <a href={ROUTES.register} className="font-robFont w-[80%] text-end font-bold text-blue0">
          Sign Up
        </a>
      </div>
    </div>
  );
}
