"use client"

import React, { useState } from "react";
import logo from "@/assets/logo_azul.png";
import check from "@/assets/checked.png";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the styles

interface ReturnBack {
  token: string;
  instructor: number;
  id: number;
}

export default function Home() {
  const [auth, setAuth] = useState({ edv: "", password: "" });

  const style = {
    firstDiv: "w-1/3 h-[100%]",
    secondDiv: "bg-white w-1/3  rounded-[8px] flex flex-col items-center justify-center h-[100%] gap-10",
    principalDiv: "bg-blue1 h-screen flex flex-row w-[100%] justify-center pt-10 pb-10 items-center gap-12",
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

      localStorage.setItem("instructor", data.instructor.toString());
      localStorage.setItem("token", data.token); // Exemplo de salvamento
      localStorage.setItem("id", data.id.toString()); // Exemplo de salvamento
      localStorage.setItem("profile", data.id.toString());

      fetch(`http://localhost:8080/profile/${data.id}`,
        {
          headers: { "Authorization": `Bearer ${data.token}` }
        }
      ).then(response => (response.json())).then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
      });

      localStorage.setItem("instructor", data.instructor.toString()); // Exemplo de salvamento
      toast.success("Login bem-sucedido!"); 
      window.location.href = ROUTES.home;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
  
      toast.error("Erro ao fazer login."); 
    }
  };

  return (
    <div className={style.principalDiv}>
      <div className={style.firstDiv}>
        <div className="flex flex-row items-center gap-5">
          <Image src={logo} alt="img" />
          <h1 className="font-robFont text-lessWhite text-[24px]">
            Engineering<br /> Technical<br /> School
          </h1>
        </div>
        <div className="flex flex-col gap-3 m-10">
          <h1 className="font-robCondensed text-lessWhite text-[26px] font-semibold">Bem-vindo(a) à ETS</h1>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-lessWhite text-[20px]">Forme uma comunidade unida</h3>
          </div>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-lessWhite text-[20px]">Junte-se com colegas</h3>
          </div>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-lessWhite text-[20px]">Compartilhe seu conhecimento</h3>
          </div>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-lessWhite text-[20px]">Não fique desconectado</h3>
          </div>
        </div>
      </div>
      <div className={style.secondDiv}>
        <h1 className="font-robCondensed text-blue1 font-semibold text-[35px]">Login</h1>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="edv" className="font-robFont w-[80%] text-start font-bold text-blue1">
            EDV
          </label>
          <input
            type="text"
            name="edv"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="Digite seu edv..."
            value={auth.edv}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="password" className="font-robFont w-[80%] text-start font-bold text-blue1">
            Senha
          </label>
          <input
            type="password"
            name="password"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="Digite sua senha..."
            value={auth.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue1 w-[80%] p-2 text-lessWhite rounded-[8px] font-medium  font-robCondensed text-center "
        >
          Entrar
        </button>
        <a href={ROUTES.register} className="font-robFont w-[80%] text-end font-bold text-blue1">
          Registrar-se
        </a>
      </div>
      {/* Add ToastContainer here to render the toasts */}
      <ToastContainer />
    </div>
  );
}
