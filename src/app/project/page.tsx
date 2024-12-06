"use client"

import Card from "@/components/card"
import dataTests from '@/constants/dataTests.json'
import dataUser from '@/constants/dataUserTests.json'
import Image from "next/image"
import { useState, ChangeEvent } from "react"
import ImageComponent from "@/components/image"

type Person = {
    id: number
    name: string
    image: string
}

type Goals = {
    text: string
}

const Projects = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [openNext, setOpenNext] = useState<boolean>(true)
    const [personValue, setPersonValue] = useState<string>('') 
    const [listPeople, setListPeople] = useState<Person[]>([]) 

    // Função para atualizar o valor de pesquisa
    const setValuePerson = (event: ChangeEvent<HTMLInputElement>) => {
        setPersonValue(event.target.value)
    }

    // Função para criar ou selecionar uma pessoa
    const createPeople = (person: Person) => {
        if(!listPeople.includes(person))
            setListPeople(prevList => [...prevList, person]) // Adiciona a pessoa ao projeto
    }

    return (
        <>
            {/* Modal to create projects */}
            {open && (
                <div className={styles.modalContainer}>
                    <form action={"POST"} id="modal" className={styles.modalBox}>
                        <h1 className={styles.title}>Crie um novo projeto</h1>
                        <div className={styles.content}>
                            <p>Digite um nome para o seu projeto</p>
                            <input className={styles.input} type="text" />
                            <p>Digite uma descrição para o seu projeto</p>
                            <input className={styles.input} type="text" />
                            <p>Adicione os objetivos do seu projeto</p>
                            <div className="flex gap-10">
                                <input className={styles.inputObj} type="text" />
                                <Image src={'icons8-adicionar-100.png'} width={50} height={50} alt="" priority className={styles.icon} />
                            </div>
                        </div>
                        <div className="flex justify-center gap-3">
                            <button className={styles.btnNext} onClick={() => { setOpen(false); setOpenNext(true) }}>Próximo</button>
                            <button className={styles.btnCancel} onClick={() => { setOpen(false) }}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal para adicionar pessoas ao projeto */}
            {openNext && (
                <div className={styles.modalContainer}>
                    <form action={"POST"} id="modal" className={styles.modalNext}>
                        <h1 className={styles.title}>Adicione pessoas ao seu projeto</h1>
                        <div className={`${styles.content} mb-20`}>
                            <p>Busque por nome</p>
                            <div className="flex gap-10">
                                <input
                                    id="person"
                                    className={styles.inputObj}
                                    onChange={setValuePerson}
                                    type="text"
                                    placeholder="ex: Eduardo Henrique Ribeiro"
                                    value={personValue}
                                />
                            </div>

                            {/* Exibição das pessoas encontradas */}
                            <div className={styles.peopleSelect}>
                                {dataUser
                                    .filter((person) => person.name.toLowerCase().includes(personValue.toLowerCase())) // Filtro da pesquisa
                                    .map((person) => (
                                        <div className={styles.person} key={person.id} onClick={() => createPeople(person)}>
                                            <ImageComponent src={person.image} width={40} height={40} alt="" className={styles.imgProfile} />
                                            <p className="self-center">{person.name}</p>
                                            <ImageComponent src={'icons8-adicionar-100.png'} width={30} height={30} alt="" className={styles.iconAdd} />
                                        </div>
                                    ))}
                            </div>

                            <p>Abaixo irão aparecer as pessoas adicionadas</p>

                            {/* Exibindo as pessoas selecionadas */}
                            <div className={styles.people}>
                                {listPeople.map((person) => (
                                    <div className={styles.person} key={person.id}>
                                        {person.image ? (
                                            <ImageComponent src={person.image} width={40} height={40} alt="" className={styles.imgProfile} />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-300 rounded-full" /> // Exibe um fallback caso 'image' esteja ausente
                                        )}
                                        <p className="self-center">{person.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 p-2">
                            <button className={styles.btnNext} onClick={() => { setOpenNext(false) }}>Finalizar</button>
                            <button className={styles.btnCancel} onClick={() => { setOpenNext(false) }}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.header}>
                <h1 className={styles.title}>Seus projetos</h1>
                <p>Seus projetos aparecem aqui</p>

                {/* Add projects */}
                <div className="flex justify-end">
                    <div className="w-auto" onClick={() => setOpen(true)}>
                        <ImageComponent src={'icons8-adicionar-100.png'} width={50} height={50} alt="" className={styles.icon} />
                    </div>
                </div>
            </div>

            {/* Cards view */}
            <div className={styles.container}>
                {dataTests.map((item, index) => (
                    <Card key={index} title={item.title} mainQuestion={item.description} image={item.image} />
                ))}
            </div>
        </>
    )
}

const styles = {
    title: 'text-blue1 text-3xl mt-4',
    input: 'bg-gray-100 w-full p-4 my-4 border-b-4 border-blue3',
    inputObj: 'bg-gray-100 w-[500px] p-4 my-4 border-b-4 border-blue3',
    content: 'm-4',
    header: 'm-10',
    container: 'flex justify-center items-center flex-wrap m-10 mx-35',
    icon: 'cursor-pointer h-16 w-auto self-center',
    iconAdd: 'cursor-pointer h-8 w-auto self-end',
    modalContainer: "h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]",
    modalBox: "bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]",
    modalNext: "bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[620px]",
    btnNext: 'bg-blue3 p-2 text-white rounded px-6 py-4 hover:bg-blue2',
    btnCancel: 'bg-red-700 p-2 text-white rounded px-6 py-4 hover:bg-red-800',
    peopleSelect: 'flex flex-col mt-2 overflow-y-scroll h-40 bg-gray-100 p-4 rounded ',
    people: 'flex h-20 flex-col mt-2 overflow-y-scroll bg-gray-100 p-4 rounded',
    person: 'flex  gap-2 items-center cursor-pointer m-2',
    imgProfile: 'object-cover rounded-full w-10 h-10',
}

export default Projects
