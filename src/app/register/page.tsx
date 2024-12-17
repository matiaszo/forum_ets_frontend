"use client"

import React, { useState } from "react";
import logo from "@/assets/logo_azul.png";
import check from "@/assets/checked.png";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";

export default function Register() {
  const [formData, setFormData] = useState({
    edv: "",
    password: "",
    name: "",
    email: "",
    instructor: false, // Sempre false conforme especificado
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const status = await response.json();

      if (status === 10) {
        alert("Registro feito com sucesso!");
        window.location.href = ROUTES.login;
      } else {
        alert("Erro ao registrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao registrar.");
    }
  };

  const style = {
    firstDiv: "w-1/4 md:w-1/3  h-4/5",
    secondDiv: "bg-white w-1/4 md:w-1/3 rounded-[8px] flex flex-col items-center justify-center pt-16 pb-16 gap-5",
    principalDiv: "bg-blue1 h-screen flex flex-row w-[100%] justify-center pt-20 pb-20 items-center gap-12",
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
          <h1 className="font-robFont text-white text-[26px]">Bem-vindo(a) à ETS</h1>
          <div className="flex flex-row gap-4 items-end">
            <Image src={check} alt="check" />
            <h3 className="font-robFont text-white text-[20px]">Começe sua carreira aqui</h3>
          </div>
          {/* Outros elementos omitidos por brevidade */}
        </div>
      </div>
      <div className={style.secondDiv}>
        <h1 className="font-robFont text-blue0 font-bold text-[35px]">Registrar-se</h1>
        <div className="w-[100%] flex flex-col items-center">
          <label className="font-robFont w-[80%] text-start font-bold text-blue0">Edv</label>
          <input
            type="text"
            name="edv"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="digite seu edv..."
            value={formData.edv}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label className="font-robFont w-[80%] text-start font-bold text-blue0">Name</label>
          <input
            type="text"
            name="name"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="digite seu name..."
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label className="font-robFont w-[80%] text-start font-bold text-blue0">Email</label>
          <input
            type="email"
            name="email"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="digite seu email..."
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label className="font-robFont w-[80%] text-start font-bold text-blue0">Password</label>
          <input
            type="password"
            name="password"
            className="font-robFont border rounded-[8px] w-[80%] h-10 p-2"
            placeholder="digite sua senha..."
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue1 w-[80%] p-2 text-white rounded-[8px] font-robFont"
        >
          Registrar-se
        </button>
        <a href={ROUTES.login} className="font-robFont w-[80%] text-end font-bold text-blue0">
          Login
        </a>
      </div>
    </div>
  );
}
