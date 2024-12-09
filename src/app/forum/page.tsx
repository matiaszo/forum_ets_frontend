"use client"

import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json";
import search from "@/assets/search.png";
import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

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

interface noticia {
    image: string;
    title: string;
    content: string;
}
  

const Forum = () => {
    const u : user = {id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: 'xmarimarquesh', instructor: 1, isUser: true}
    
    const [usuario, setUsuario] = useState(u);

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event : any) => {
        setSearchValue(event.target.value);
    };

    const styles = {
        h1: "text-blue1 text-3xl",
        box: "flex w-[100%] gap-4 items-end justify-end", 
        search: "border-b-2 border-blue1 w-[100%] p-2 outline-none", 
    };

    const initialNoticias: noticia[] = [
        {
          image: "https://www.autoindustria.com.br/wp-content/uploads/2017/07/f%C3%A1brica-bosch.jpg",
          title: "Fábrica e tals",
          content: "novidade nao sei o que lá",
        },
        {
          image: "https://www.bosch-press.com.br/pressportal/br/media/dam_images_br/bosch-xc-ki-studie-06-2.jpg",
          title: "Braço e tals",
          content: "muitos braços vindos ai",
        },
      ];

    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [notice, setNotice] = useState<noticia[]>(initialNoticias);
    const [newImage, setNewImage] = useState<string>("");
    const [newTitle, setNewTitle] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setNewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleAddNotice = () => {
        if (newTitle && newContent && newImage) {
        const newNotice: noticia = {
            image: newImage,
            title: newTitle,
            content: newContent,
        };
        setNotice((prev) => [...prev, newNotice]);
        setModalAdd(false);
        setNewImage("");
        setNewTitle("");
        setNewContent("");
        } else {
        alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <div className="flex flex-col mt-20 font-robFont">
            <Header/>
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
                        <Image className="cursor-pointer" src={search} alt={""} width={33} height={33}/>
                    </div>
                    <div className="flex items-end justify-end cursor-pointer w-[100%]" onClick={() => setModalAdd(true)}>
                        { usuario.instructor == 1 ? (
                            <div className="flex justify-end">
                                <div  className="w-auto" onClick={() => setModalAdd(true)}>
                                    <Image src={plus} width={50} height={50} alt="Adicionar Notícia" />
                                </div>
                            </div>

                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    </div>
                </div>
                {/* Renderizando os cards */}
                <div className="flex justify-center mt-10 flex-wrap gap-8 max-w-[90%]">
                    {dataTests
                        .filter((item) =>
                            item.title.toLowerCase().includes(searchValue.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((item, index) => {
                        return (
                            <Link href={ROUTES.session} key={index}>
                                <Card
                                title={item.title}
                                mainQuestion={item.description}
                                image={item.image}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Forum;
