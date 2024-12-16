"use client";

import { Header } from "@/components/header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrouUp from '@/assets/arrow-up-blue.png';
import arrouDown from '@/assets/arrow-down-blue.png';
import search from '@/assets/search.png';
import crown from '@/assets/crown.png';
import edit from '@/assets/edit.png';
import trash from '@/assets/trash-bin.png';
import plus from '@/assets/icons8-adicionar-100.png';
import { get } from "http";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSkills, setIsOpenSkills] = useState(false);

    const [skills, setSkills] = useState([]);
    const [users, setUsers] = useState([]);

    const toggleDetails = () => {
      setIsOpen(!isOpen);
    };
    
    const toggleDetailsSkills = () => {
        setIsOpenSkills(!isOpenSkills);
    };

    const getUserData = async () => {
        const response = await fetch(`http://localhost:8080/user`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
  
        const dataUser = await response.json();

        return dataUser;
    }

    const getSkillData = async () => {
        const response = await fetch(`http://localhost:8080/skills`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
  
        const dataSkills = await response.json();

        return dataSkills;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skillsData = await getSkillData();
                setSkills(skillsData);

                const userData = await getUserData();
                setUsers(userData);

                console.log(skillsData);
                console.log(userData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, []); 
    
    return (
        <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
        <Header instructor={true} />
        <div className="w-full">
            <div className="m-10">
                <h1 className="text-2xl mb-4 text-blue1 ">Bem-vindo(a), intrutor(a).</h1>
                <p>Por aqui faça a administração dos usuários e skills do sistema.</p>
            </div>
            <div className="border border-gray-300 p-4">
            <button
                onClick={toggleDetails}
                className="w-[100%] flex flex-row justify-between pr-5 pl-5"
            >
                <h1 className="text-[22px] text-blue1 font-bold">Usuários</h1>{isOpen ? (
                    <Image src={arrouUp} alt=""/>
                ) : (
                    <Image src={arrouDown} alt=""/>
                )}
            </button>
            {isOpen && (
                <div className="mt-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex space-x-4 w-[60%]">
                        <input
                            type="text"
                            placeholder="Pesquise..."
                            className="p-2 border border-blue2 rounded-md w-full outline-none"
                        />
                        <button className="p-2 text-white rounded-md">
                            <Image src={search} alt="" className="w-8 h-8" />
                        </button>
                    </div>
                    <button className="p-2 text-white rounded-md">
                        <Image src={plus} alt="" className="w-12 h-12" />
                    </button>
                    </div>
                    <div className="mt-4 mb-4">

                        {/* EXEMPLO CARD: (COLOCAR MAP) */}
                        <div className="flex flex-row gap-3 shadow-md p-4 rounded-md w-60 items-center justify-center">
                            <h1>Queila</h1>
                            {true ? (
                                <div className="flex flex-row text-blue1 font-bold">
                                    <h1>Instructor</h1>
                                    <Image src={crown} alt=""/>
                                </div>
                            ) : (
                                <></>
                            )}
                            <Image src={trash} alt=""/>
                        </div>
                    </div>
                </div>
            )}
            </div>
            <div className="border border-gray-300 p-4">
            <button
                onClick={toggleDetailsSkills}
                className="w-[100%] flex flex-row justify-between pr-5 pl-5">
                <h1 className="text-[22px] text-blue1 font-bold">Skills</h1>{isOpenSkills ? (
                    <Image src={arrouUp} alt=""/>
                ) : (
                    <Image src={arrouDown} alt=""/>
                )}
            </button>
            {isOpenSkills && (
                <div className="mt-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex space-x-4 w-[60%]">
                        <input
                            type="text"
                            placeholder="Pesquise..."
                            className="p-2 border border-blue2 rounded-md w-full outline-none"
                        />
                        <button className="p-2 text-white rounded-md">
                            <Image src={search} alt="" className="w-8 h-8" />
                        </button>
                    </div>
                    <button className="p-2 text-white rounded-md">
                        <Image src={plus} alt="" className="w-12 h-12" />
                    </button>
                    </div>
                    <div className="mt-4 mb-4">

                        {/* EXEMPLO CARD: (COLOCAR MAP) */}
                        <div className="flex flex-col gap-3 shadow-md p-4 rounded-md w-60 items-center justify-center">
                            <img src="https://beecrowd.com/wp-content/uploads/2024/04/2022-07-19-Melhores-cursos-de-Python.jpg"></img>
                            <h1 className="w-[100%] text-blue1 font-semibold text-[20px]">Python</h1>
                            <div className="flex flex-row w-[100%] justify-end">
                                <Image src={edit} alt=""/>
                                <Image src={trash} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
      
    </div>
  );
}
