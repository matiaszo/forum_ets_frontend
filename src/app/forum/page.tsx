"use client"

import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json";
import search from "@/assets/search.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import imagem from "@/assets/Matias3.jpg";
import plus from "@/assets/icons8-adicionar-100.png";

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUseraname: string | null;
    instructor: number;
    isUser: boolean;
}

interface forum {
    id: number;
    title: string;
    image: string;
    description: string;
    creator: string;
}

const Forum = () => {
    const u: user = {
        id: "1",
        name: "Mariana",
        bio: "slaaa",
        image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg",
        gitUseraname: "xmarimarquesh",
        instructor: 1,
        isUser: true,
    };

    const [usuario, setUsuario] = useState(u);
    const [searchValue, setSearchValue] = useState("");
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [newForum, setNewForum] = useState<forum[]>([]);
    const [newImage, setNewImage] = useState<string>("");
    const [newTitle, setNewTitle] = useState<string>("");
    const [newDescription, setNewDescription] = useState<string>("");

    const handleSearchChange = (event: any) => {
        setSearchValue(event.target.value);
    };

    const styles = {
        h1: "text-blue1 text-3xl",
        box: "flex w-[100%] gap-4 items-end justify-end",
        search: "border-b-2 border-blue1 w-[100%] p-2 outline-none",
    };

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGetSession = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/section", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar sessões. Tente novamente.");
            }

            const forums: forum[] = await response.json();
            setNewForum(forums);
        } catch (error) {
            console.error(error);
            // alert("Erro ao buscar sessões. Tente novamente.");
        }
    };

    const handleAddSession = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }
    
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.userId;
    
            console.log("id: " + userId);
    
            if (newTitle && newDescription && newImage) {
                const newForumData = {
                    title: newTitle,
                    image: "newImage", 
                    description: newDescription,
                    userId: userId,
                };
    
                try {
                    const response = await fetch("http://localhost:8080/section/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(newForumData),
                    });
    
                    if (!response.ok) {
                        throw new Error("Erro ao criar a sessão. Tente novamente.");
                    }
    
                    const createdForum = await response.json();
                    setNewForum((prev) => [...prev, createdForum]);
                    setModalAdd(false);
                    setNewImage("");
                    setNewTitle("");
                    setNewDescription("");

                    handleGetSession();
                } catch (error) {
                    console.error("Erro no servidor:", error);
                    alert("Erro ao criar a sessão. Tente novamente.");
                }
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            alert("Erro no token. Faça login novamente.");
        }
    };

    useEffect(() => {
        handleGetSession();
    }, []); 

    return (
        <div className="flex flex-col mt-20 font-robFont">
            <Header />
            {modalAdd && (
                <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
                    <div className="bg-white p-12 rounded-lg w-[600px] ">
                        <form id="modal" className="">
                            <h1 className="text-blue1 text-3xl">Adicionar Sessão ao Fórum</h1>
                            <div className="flex flex-col items-center space-y-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    id="cameraInput"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                                <label htmlFor="cameraInput" className="cursor-pointer">
                                    {newImage ? (
                                        <img
                                            src={newImage}
                                            alt="Nova Imagem"
                                            className="w-96 h-64 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                            Adicione uma imagem
                                        </div>
                                    )}
                                </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Digite o título da sessão"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "
                            />
                            <textarea
                                placeholder="Digite uma descrição à sessão"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "
                            />
                        </form>
                        <div className="w-[100%] flex items-end justify-end mt-5">
                            <button
                                onClick={handleAddSession}
                                className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setModalAdd(false)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="pr-20 pl-20 pt-10 flex flex-col items-center">
                <div className="flex flex-col flex-wrap w-[100%]">
                    <h1 className={styles.h1}>Acesse o fórum do setor aqui</h1>
                    <p>Converse com seus colegas sobre os mais diversos tópicos.</p>
                </div>

                <div className="w-[100%] flex flex-row justify-end items-end">
                    <div className="flex w-[65%]">
                        <div className={styles.box}>
                            <input
                                className={styles.search}
                                type="text"
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder="Pesquise por título, pergunta.."
                            />
                            <Image
                                className="cursor-pointer"
                                src={search}
                                alt={""}
                                width={33}
                                height={33}
                            />
                        </div>
                        <div className="flex items-end justify-end w-[100%]">
                            {usuario.instructor == 1 ? (
                                <div
                                    className="w-auto cursor-pointer"
                                    onClick={() => setModalAdd(true)}
                                >
                                    <Image
                                        src={plus}
                                        width={50}
                                        height={50}
                                        alt="Adicionar Sessao"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10 flex-wrap gap-8 max-w-[90%]">
                {newForum
                    .filter(
                        (item) =>
                            item?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item?.description?.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((item, index) => (
                        <Link href={`${ROUTES.session}/${item.id}`} key={index}>
                            <Card
                                title={item.title || "Título Indisponível"}
                                mainQuestion={item.description || "Descrição Indisponível"}
                                image={imagem}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forum;
