"use client"
import { Header } from "@/components/header";
import data from '@/constants/dataProjects.json'
import { useState } from "react";
import CardMessage from "@/components/cardMessage";
import ImageComponent from "@/components/image";

const idProjectExemple = 1
const limit = 200
const dataItems = data.find(project => project.id == idProjectExemple)

const projectPage = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    // função para alternar o estado de expandido, nega o estado anterior quando clica
    const toggleDescription = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <>
            <Header instructor={false} />
            <div className="h-[480px] overflow-y-auto scrollbar-hidden p-6" >

                <div className="mt-24 ml-8" >
                    <h1 className={styles.title}>
                        {dataItems?.name}
                    </h1>
                    <p className="flex flex-wrap max-w-[750px]">
                        {isExpanded || dataItems?.description && dataItems.description.length <= limit
                            ? dataItems?.description
                            : dataItems?.description.substring(0, limit) + "..."}
                        {/* botão "Ler mais" ou "Ler menos" */}
                        {dataItems?.description && dataItems.description.length > limit && (
                            <span 
                                className="text-blue-500 cursor-pointer" 
                                onClick={toggleDescription}>
                                {isExpanded ? "Ler menos" : "Ler mais"}
                            </span>
                        )}
                    </p>
                </div>


                <div className="mt-6 ml-8 ">
                <h1 className={styles.title} >Objetitvos</h1>
                    {/* iterando sobre a lista de objetivos */}
                    {data.find(project => project.id == idProjectExemple)?.goals
                        .map((goal, index) => {
                            return (
                                <h2 key={index}>
                                    <input type="checkbox" id="objetivo1" className={styles.checkbox} />
                                    <label key={index} className="ml-2">{goal}</label>
                                </h2>
                            )
                        })
                    }
                </div>

            </div>

            <hr className="shadow" />
            <div className="flex flex-col w-11/12 p-4 justify-self-center" >
                <div className="flex flex-col h-[300px] overflow-y-auto gap-3 scrollbar-hidden " >
                    {dataItems?.messages.map((msg)=> {
                        return(
                            <div key={msg.id} >
                                <CardMessage user={msg.user.name}
                                text={msg.text}
                                image={msg.user.image} />
                            </div>
                        )
                    }) }
                </div>

                <input className="outline-none mt-4 rounded-full p-2 bg-slate-100 " type="text" name="" id="" />
            </div>
        </>
    ) 
}

const styles= {
    title: "text-blue1 text-3xl mb-4",
    checkbox : 'w-4 h-4 border-2 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 checked:bg-green-500 checked:border-green-500 transition-colors duration-200 ease-in-out'
}


export default projectPage;