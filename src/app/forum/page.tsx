"use client"

import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json";
import search from "@/assets/search.png";
import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const Home = () => {
    
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event : any) => {
        setSearchValue(event.target.value);
    };

    const styles = {
        h1: "text-blue1 text-3xl",
        box: "flex justify-end w-full gap-9", 
        search: "border-2 border-blue1 rounded w-4/12 p-2", 
    };

    return (
        <div className="flex flex-col mt-20 ">
            <Header/>
            <div className="items-center w-[100%] flex flex-col p-10">
                <div className="flex flex-col flex-wrap w-[100%]">
                    <h1 className={styles.h1}>Acesse o fórum do setor aqui</h1>
                    <p>Converse com seus colegas sobre os mais diversos tópicos.</p>
                </div>

                {/* Caixa de pesquisa */}
                <div className={styles.box}>
                    <input
                        className={styles.search}
                        type="text"
                        value={searchValue} 
                        onChange={handleSearchChange} 
                        placeholder="Pesquise por título, pergunta.."
                        />
                    <Image className="cursor-pointer" src={search} alt={""} width={50} height={50}/>
                </div>

                {/* Renderizando os cards */}
                <div className="flex justify-center mt-10 flex-wrap gap-10 w-[80%]">
                    {dataTests
                        .filter((item) =>
                            item.title.toLowerCase().includes(searchValue.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((item, index) => {
                        return (
                            <Link href={ROUTES.section}>
                                <Card
                                key={index}
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

export default Home;
