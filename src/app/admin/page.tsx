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
import plusLight from '@/assets/plusClaro.png'
import searchLight from '@/assets/pesquisarClaro.png'

interface usuario {
    id: string;
    name: string;
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

    const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
    const [openModalSkills, setOpenModalSkills] = useState<boolean>(false);

    const [isDarkMode, setIsDarkMode] = useState(false); 

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
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark"); 
              } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove("dark");
              }
        };

        fetchData();
    }, [searchUser, searchSkill]);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setIsDarkMode(!isDarkMode);
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

    const [formData, setFormData] = useState({
        edv: "",
        password: "12345678",
        name: "",
        email: "",
        instructor: false, 
      });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createUser = async (e:any) => {
        e.preventDefault();

        if (!formData.email.includes("@")) {
            alert("Por favor, insira um email válido.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    edv: formData.edv,
                    password: formData.password,
                    name: formData.name,
                    email: formData.email,
                    instructor: formData.instructor
                }),
            });
    
            if (!response.ok) {
                throw new Error("Erro ao criar usuário");
            }

            const u = {
                id: formData.edv,
                name: formData.name,
                instructor: formData.instructor
            }
    
            setUsers((prevUsers) => [...prevUsers, u]); 
            setOpenModalInfo(false);
            alert("Usuario criado com sucesso!")
            
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    const createSkill = async (skill : {name: string, image: string}) => {
        try {
            const response = await fetch("http://localhost:8080/skills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: skill.name,  
                    image: skill.image,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Erro ao criar skill");
            }
    
            const newSkill = await response.json();
            setSkills((prevSkills) => [...prevSkills, newSkill]);
            alert("Skill criada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar skill:", error);
            alert("Erro ao criar skill. Verifique os dados e tente novamente.");
        }
    };
    
    
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createSkill({ name, image }); 
        setName(""); 
        setImage("");
        setOpenModalSkills(false); 
    };

    return (
        <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
            <Header toggleTheme={toggleTheme} instructor={true} />

            {/* Modal de criação de usuario */}
            {openModalInfo && (
                <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
                    <form  id="modal" className="bg-white w-[600px] p-8 flex-wrap rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]">
                        <h1 className="text-blue1 text-3xl font-robCondensed mb-5">Adicionar Usuário</h1>

                        <div className="">

                            <div className="w-[100%] flex mb-4 flex-col items-center">
                                <label className="font-robFont text-black w-[100%] text-start text-[18px]">Edv</label>
                                <input
                                    type="text"
                                    name="edv"
                                    className="font-robFont text-black w-[100%] h-10 p-2 border-b-2 border-blue2"
                                    placeholder="type edv..."
                                    value={formData.edv}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div className="w-[100%] flex mb-4 flex-col items-center">
                                <label className="font-robFont text-black w-[100%] text-start text-[18px]">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="font-robFont text-black w-[100%] h-10 p-2 border-b-2 border-blue2"
                                    placeholder="type name..."
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div className="w-[100%] flex mb-4 flex-col items-center">
                                <label className="font-robFont text-black w-[100%] text-start text-[18px]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="font-robFont text-black w-[100%] h-10 p-2 text-black border-b-2 border-blue2"
                                    placeholder="type email..."
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div className="w-[100%] flex mb-4 flex-col">
                                <label className="font-robFont text-black w-[100%] text-start text-[18px]">Instrutor</label>
                                <label className="relative inline-flex items-center cursor-pointer mt-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.instructor}
                                        onChange={() => setFormData({ ...formData, instructor: !formData.instructor })}
                                        className="sr-only peer text-black"
                                        />
                                    <div
                                        className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
                                        dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                        ></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900">
                                        {formData.instructor ? "Sim" : "Não"}
                                    </span>
                                </label>
                            </div>
                            <h1 className="text-red-600">Senha primeiro acesso: 123456</h1>

                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                            className="bg-blue-500 text-white rounded-md px-3 py-3 hover:bg-blue-800"
                            onClick={(event) => {
                                createUser(event);
                            }}
                            >
                            Adicionar
                            </button>
                            <button
                            className="bg-red-500 text-white rounded-md px-3 py-3 hover:bg-red-800"
                            onClick={() => {
                                setOpenModalInfo(false);
                            }}
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal de criação de skills */}
            {openModalSkills && (
                <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
                    <form
                        id="modal"
                        className="bg-white w-[600px] p-8 flex-wrap rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]"
                        onSubmit={handleSubmit} // Evento de submit do form
                    >
                        <h1 className="text-blue1 text-3xl font-robCondensed mb-5">
                            Adicionar Skill
                        </h1>

                        <div className="">

                            <div className="w-[100%] flex mb-4 flex-col items-center">
                                <label className="font-robFont w-[100%] text-start text-[18px]">
                                    Image
                                </label>
                                {/* KAU COLOCAR AQUI O CLOUDINERY*/}
                                <input
                                    type="file"
                                    name="name"
                                    className="font-robFont w-[100%] h-10 p-2 border-b-2 border-blue2"
                                    placeholder="select image..."
                                    value={image}
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className="w-[100%] flex mb-4 flex-col items-center">
                                <label className="font-robFont w-[100%] text-start text-[18px]">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="font-robFont w-[100%] h-10 p-2 border-b-2 border-blue2"
                                    placeholder="type name..."
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md px-3 py-3 hover:bg-blue-800"
                            >
                                Adicionar
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white rounded-md px-3 py-3 hover:bg-red-800"
                                onClick={() => {
                                    setOpenModalInfo(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="w-full">
                <div className="m-10">
                    <h1 className="text-2xl mb-4 text-blue1 dark:text-blue5 ">Bem-vindo(a), instrutor(a).</h1>
                    <p className="dark:text-white" >Por aqui faça a administração dos usuários e skills do sistema.</p>
                </div>
                <div className="border border-gray-300 p-4">
                    <button
                        onClick={toggleDetails}
                        className="w-[100%] flex flex-row justify-between pr-5 pl-5"
                    >
                        <h1 className="text-[22px] text-blue1 dark:text-blue5 font-bold">Usuários</h1>
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
                                        className="p-2 text-black border border-blue2 rounded-md w-full outline-none"
                                        value={searchUser}
                                        onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                    <button className="p-2 text-white rounded-md">
                                        <Image src={isDarkMode? searchLight: search} alt="" className="w-8 h-8" />
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <div className="w-auto cursor-pointer" onClick={() => setOpenModalInfo(true)}>
                                        <Image src={isDarkMode? plusLight:plus} alt="" className="w-12 h-12" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-4 flex flex-wrap gap-6">
                                {users.map((user, i) => {
                                    return (
                                        <div key={i} className="flex border-2 dark:border-blue4  flex-row gap-3 shadow-md p-4 rounded-md w-60 items-center justify-between">
                                            <h1 className="capitalize dark:text-white">{user.name}</h1>
                                            {user.instructor ? (
                                                <div className="flex flex-row  text-blue1 font-bold">
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
                        <h1 className="text-[22px] dark:text-blue5 text-blue1 font-bold">Skills</h1>
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
                                        className="p-2 border text-black border-blue2 rounded-md w-full outline-none"
                                        value={searchSkill}
                                        onChange={(e) => setSearchSkill(e.target.value)}
                                    />
                                    <button className="p-2 text-white rounded-md">
                                        <Image src={isDarkMode? searchLight: search} alt="" className="w-8 h-8" />
                                    </button>
                                </div>
                                <button className="p-2 text-white rounded-md">
                                    <Image src={isDarkMode? plusLight: plus} alt="" className="w-12 h-12" />
                                </button>
                            </div>
                            <div className="mt-4 mb-4 flex flex-wrap gap-10 w-[100%] justify-center">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col gap-3 shadow-md p-4 rounded-md w-44 items-center justify-center">
                                        <img className="w-20 h-auto object-cover" src={skill.image}></img>
                                        <h1 className="w-[100%] text-blue1 font-semibold text-[20px]">{skill.name}</h1>
                                        <div className="flex flex-row w-[100%] justify-end">
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
