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

interface usuario {
    id: string;
    name: string;
    image: string;
    instructor: boolean;
}

interface skill {
    id: string;
    name: string;
    image: string;
}

export default function Admin() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSkills, setIsOpenSkills] = useState(false);
    
    const [skills, setSkills] = useState<skill[]>([]);
    const [users, setUsers] = useState<usuario[]>([]);

    const [searchUser, setSearchUser] = useState('');
    const [searchSkill, setSearchSkill] = useState('');

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };
    
    const toggleDetailsSkills = () => {
        setIsOpenSkills(!isOpenSkills);
    };

    const getUserData = async (search: string) => {
        const response = await fetch(`http://localhost:8080/user?name=${search}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const dataUser = await response.json();
        setUsers(dataUser);
    };

    const getSkillData = async (search: string) => {
        const response = await fetch(`http://localhost:8080/skills?name=${search}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        
        const dataSkills = await response.json();
        setSkills(dataSkills);
    };

    const deleteUser = async (id: string) => {
        const response = await fetch(`http://localhost:8080/profile/${Number(id)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar usuário');
        }

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };
    
    const deleteSkill = async (id: string) => {
        const response = await fetch(`http://localhost:8080/skills/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar skill');
        }

        setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                getUserData(searchUser);
                getSkillData(searchSkill);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, [searchUser, searchSkill]);

    return (
        <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
            <Header instructor={true} />
            <div className="w-full">
                <div className="m-10">
                    <h1 className="text-2xl mb-4 text-blue1 ">Bem-vindo(a), instrutor(a).</h1>
                    <p>Por aqui faça a administração dos usuários e skills do sistema.</p>
                </div>
                <div className="border border-gray-300 p-4">
                    <button
                        onClick={toggleDetails}
                        className="w-[100%] flex flex-row justify-between pr-5 pl-5"
                    >
                        <h1 className="text-[22px] text-blue1 font-bold">Usuários</h1>
                        {isOpen ? (
                            <Image src={arrouUp} alt=""/>
                        ) : (
                            <Image src={arrouDown} alt=""/>
                        )}
                    </button>
                    {isOpen && (
                        <div className="mt-4 m-10">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex space-x-4 w-[60%]">
                                    <input
                                        type="text"
                                        placeholder="Pesquise..."
                                        className="p-2 border border-blue2 rounded-md w-full outline-none"
                                        value={searchUser}
                                        onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                    <button className="p-2 text-white rounded-md">
                                        <Image src={search} alt="" className="w-8 h-8" />
                                    </button>
                                </div>
                                <button className="p-2 text-white rounded-md">
                                    <Image src={plus} alt="" className="w-12 h-12" />
                                </button>
                            </div>
                            <div className="mt-4 mb-4 flex flex-wrap gap-6">
                                {users.map((user, i) => {
                                    return (
                                        <div key={i} className="flex flex-row gap-3 shadow-md p-4 rounded-md w-60 items-center justify-between">
                                            <h1 className="capitalize">{user.name}</h1>
                                            {user.instructor ? (
                                                <div className="flex flex-row text-blue1 font-bold">
                                                    <h1>Instructor</h1>
                                                    <Image src={crown} alt=""/>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            <Image className="cursor-pointer" src={trash} alt="" onClick={() => deleteUser(user.id)} />
                                        </div> 
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="border border-gray-300 p-4">
                    <button
                        onClick={toggleDetailsSkills}
                        className="w-[100%] flex flex-row justify-between pr-5 pl-5">
                        <h1 className="text-[22px] text-blue1 font-bold">Skills</h1>
                        {isOpenSkills ? (
                            <Image src={arrouUp} alt=""/>
                        ) : (
                            <Image src={arrouDown} alt=""/>
                        )}
                    </button>
                    {isOpenSkills && (
                        <div className="mt-4 m-10">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex space-x-4 w-[60%]">
                                    <input
                                        type="text"
                                        placeholder="Pesquise..."
                                        className="p-2 border border-blue2 rounded-md w-full outline-none"
                                        value={searchSkill}
                                        onChange={(e) => setSearchSkill(e.target.value)}
                                    />
                                    <button className="p-2 text-white rounded-md">
                                        <Image src={search} alt="" className="w-8 h-8" />
                                    </button>
                                </div>
                                <button className="p-2 text-white rounded-md">
                                    <Image src={plus} alt="" className="w-12 h-12" />
                                </button>
                            </div>
                            <div className="mt-4 mb-4 flex flex-wrap gap-10 w-[100%] justify-center">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col gap-3 shadow-md p-4 rounded-md w-44 items-center justify-center">
                                        <img className="w-20 h-auto object-cover" src={skill.image}></img>
                                        <h1 className="w-[100%] text-blue1 font-semibold text-[20px]">{skill.name}</h1>
                                        <div className="flex flex-row w-[100%] justify-end">
                                            <Image src={edit} alt=""/>
                                            <Image src={trash} className="cursor-pointer" alt="" onClick={() => deleteSkill(skill.id)}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
