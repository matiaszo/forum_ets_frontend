"use client"
import { Header } from "@/components/header";
import { HeaderProfile } from "@/components/headerProfile";
import { useState } from "react";
import Image from "next/image";
import profilePhoto from "@/assets/Koala.jpg";
import editPhoto from "@/assets/edit.png";
import {Modal} from "@/components/Modal";
import { InicioProfile } from "@/components/inicioProfile";
import { FeedbackProfile } from "@/components/feedbackProfile";

interface skillInterface {
    id: string;
    title: string;
    image: string;
}

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUseraname: string;
    instructor: number;
}

interface feedback {
    id: string;
    stars : number,
    text : string,
    public : boolean,
    projectName : string,
    user : {
        id : string,
        image : string,
        name : string
    }
}

export default function Home() {
    const [activeTab, setActiveTab] = useState('inicio');
    
    
    const [theme, setTheme] = useState('dark');

    // --- MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeModalAndSave = (name : string) => {
        setIsModalOpen(false)
        setNameUser(name)
    };
    
    const usuario : user = {id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: "xmarimarquesh", instructor: 1}
    
    const feed : feedback[] = [
        {id: "1", stars: 2, text: "slaaa", public: true, projectName: "Projeto", user: {id: '1', name: 'Mariana', image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg"}}
    ];

    const [nameUser, setNameUser] = useState(usuario.name);
    const [nameUserTemp, setNameUserTemp] = useState(usuario.name);
    
    const renderTabContent = () => {
        switch (activeTab) {
          case 'inicio':
            return (
                <InicioProfile usuario={usuario} />
            )
          case 'feedback':
            return (
                <FeedbackProfile feedbacks={feed}/>
            );
          case 'interacoes':
            return (
                <div>Conteúdo da aba Início</div>
            );
          default:
            return null;
        }
    };

    return (
        <div className="w-[100%] mt-10">
            <Header/>
            <div className="w-[100%] flex flex-row p-10 gap-10">
                <div className="w-[30%] h-screen shadow-lg flex-col rounded-lg flex items-center p-12 justify-between">
                    <div className="flex flex-col items-center w-[100%]">
                        <img src={usuario.image} alt="profile photo" className="w-64 h-64 object-cover rounded-full" />
                        <h1 className="text-[26px]" >{usuario.name}</h1>
                        <h1 className="text-[18px]" >{usuario.instructor == 1 ? 'Instructor' : 'Aprendice'}</h1>
                        {usuario.bio ? (
                            <div className="bg-blue4 p-4 rounded-lg w-[100%] mt-10">
                                <h1>{usuario.bio}</h1>
                            </div> 
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <div className="w-[100%] justify-end flex">
                        <button onClick={openModal} >
                            <Image src={editPhoto} alt="edit" className="cursor-pointer" />
                        </button>
                    </div>
                </div>
                <div className="w-[70%] shadow-lg rounded-lg h-screen p-5 ">
                    <HeaderProfile activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="pt-5 ">
                        {renderTabContent()}
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h1 className="text-[32px] font-robFont mb-5">Editar Perfil</h1>
                    <img src={usuario.image} alt="profile photo" className="w-64 h-64 object-cover rounded-full" />
                    <label htmlFor="" className="mt-10 text-[22px] w-[100%]">Nome</label>
                    <input type="text" value={nameUserTemp} onChange={(e) => setNameUserTemp(e.target.value)} className="w-[100%] border-b-2 border-blue3 outline-none p-2" placeholder="Seu nome..." />
                    <label htmlFor="" className="mt-10 text-[22px] w-[100%]">Biogafia</label>
                    <textarea value={usuario.bio} onChange={(e) => setNameUserTemp(e.target.value)} className="w-[100%] rounded-sm border-2 border-blue3 outline-none p-2" placeholder="Seu nome..." />
                    <div className="w-[100%] flex items-end justify-end">
                        <button onClick={() => closeModalAndSave(nameUserTemp)} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900">Salvar</button>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black" >Fechar</button>
                    </div>
                </Modal>
                </div>
        </div>
    );
}
