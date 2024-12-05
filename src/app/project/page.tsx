"use client"

import Card from "@/components/card"
import dataTests from '@/constants/dataTests.json'
import add from '@/assets/icons8-adicionar-100.png'
import addAnimate from '@/assets/icons8-adicionar.gif'
import Image from "next/image"
import { useState, useEffect } from "react"
import { Monsieur_La_Doulaise } from "next/font/google"

type people = {
    id: number,
    name: string
}

const projects = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [openNext, setOpenNext] = useState<boolean>(true)
    const [popleValue, setPeopleValue] = useState<people[]>([])

    return(
        <>
        {/* modal to create projects */}
            {open && (

            <div className={styles.modalContainer} >
                <form action={"POST"} id="modal" className={styles.modalBox} >
                    <h1 className={styles.title} >Crie um novo projeto</h1>
                    <div className={styles.content} >
                        <p>Digite um nome para se projeto</p>
                        <input className={styles.input} type="text" />
                        <p>Digite uma descrição para se projeto</p>
                        <input className={styles.input} type="text" />
                        <p>Adicione os objetivos do seu projeto</p>
                        <div className="flex gap-10">
                            <input className={styles.inputObj} type="text" />
                            <Image src={add} width={50} height={50} alt="" priority className={styles.icon}/>
                        </div>

                    </div>
                    <div className="flex justify-center gap-3">
                        <button className={styles.btnNext} onClick={() => {setOpen(false); setOpenNext(true)}}>Próximo</button>
                        <button className={styles.btnCancel}  onClick={() => {setOpen(false)}}>Cancelar</button>
                    </div>
                </form>
            </div>
            
            
            )}

            {openNext && (

            <div className={styles.modalContainer} >
                <form action={"POST"} id="modal" className={styles.modalNext}>
                    <h1 className={styles.title}>Adicione pessoas ao seu projeto</h1>
                    <div className={`${styles.content} mb-20`} >
                        {/* barra de busca, o front vai enviar o nome pesquisado, o beck vai buscar por nome e achar os usuários, os users retornados aparecerão ali em baixo */}
                        <p>Busque por nome</p>
                        <div className="flex gap-10">
                            <input className={styles.inputObj} type="text" placeholder="ex: Eduardo Henrique Ribeiro" />
                            <Image src={add} width={50} height={50} alt="" priority className={styles.icon}/>
                        </div>
                        {/* vai guardar os users na lista e os users da lista serão exibidos alí em baixo, depois será enviada uma requisição ´para criar o projeto com os users da lista */}
                        <p>Abaixo irão aparecer as pessoas adicionadas</p>
                    </div>
                    <div className="flex justify-center gap-3 p-2">
                        <button className={styles.btnNext} >Próximo</button>
                        <button className={styles.btnCancel} onClick={() =>{setOpenNext(false)}}>Cancelar</button>
                    </div>
                </form>
            </div>


            )}

            <div className={styles.header} >

                <h1 className={styles.title} >Seus projetos</h1>
                <p>Seus projetos aparecem aqui</p>

                {/* add projects */}
                <div className="flex justify-end" >
                    <div className="w-auto" onClick={() => setOpen(true)}>
                        <Image src={add} width={50} height={50} alt="" className={styles.icon}/>
                    </div>
                </div>

            </div>

            {/* cards view */}
            <div className={styles.container}>
                {dataTests.map((item, index) => {
                    return (
                        <Card key={index} title={item.title} mainQuestion={item.mainQuestion} image={item.image} />
                    )
                })}
            </div>
        </>
    )
}

const styles = {
    title : 'text-blue1 text-3xl mt-4',
    input : 'bg-gray-100 w-full p-4 my-4 border-b-4 border-blue3',
    inputObj : 'bg-gray-100 w-[500px] p-4 my-4 border-b-4 border-blue3',
    content: 'm-4',
    header: ' m-10',
    container: 'flex justify-center items-center flex-wrap m-10 mx-35',
    icon: 'cursor-pointer h-16 w-auto self-center',
    modalContainer: "h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]",
    modalBox: "bg-white w-[600px] max-h- p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]",
    modalNext: "bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[520px]",
    btnNext: 'bg-blue3 p-2 text-white rounded px-6 py-4 hover:bg-blue2',
    btnCancel : 'bg-red-700 p-2 text-white rounded px-6 py-4 hover:bg-red-800'
}
// bg-[#174580A0]
export default projects;