"use client"
import { Header } from "@/components/header";
import { HeaderProfile } from "@/components/headerProfile";
import { useState } from "react";
import Image from "next/image";
import profilePhoto from "@/assets/Koala.jpg";
import editPhoto from "@/assets/edit.png";
import {Modal} from "@/components/ModalEditProfile";
import { InicioProfile } from "@/components/inicioProfile";
import { FeedbackProfile } from "@/components/feedbackProfile";
import { InteracaoProfile } from "@/components/interacaoProfile";

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
    isUser: boolean;
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
        name : string,
        isUser : boolean,
    }
}

interface interacao {
    id: string,
    type : string,
    timestamp : Date,
    content : {
        text : string | null,
        username : string | null,
        title : string | null,
        public : boolean | null,
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
    
    const usuario : user = {id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: "xmarimarquesh", instructor: 1, isUser: false}
    
    const feed : feedback[] = [
        {id: "1", stars: 2, text: "mais ou menos boa", public: true, projectName: "Projeto JAVA FINAL", user: {id: '1', name: 'Kau Menendez', image: "https://borboletariodesaopaulo.com.br/wp-content/uploads/2024/03/borboleta-monarca-foto-macro.jpg", isUser: false}},
        {id: "2", stars: 4, text: "Muito n sei o que n sei o que lá", public: false, projectName: "Projeto de IoT", user: {id: '1', name: 'Matias Zoniga', image: "https://s2.glbimg.com/RFnG4EgIzgmpejlSjWA8K3apZ5M=/e.glbimg.com/og/ed/f/original/2016/04/15/tiger-02.jpg", isUser: false}}
    ];

    const inte : interacao[] = [
        {   
            id: "1",
            type: "like",
            timestamp: new Date(),
            content: {
                text:  null,
                username: "usuario123",
                title: "Integração dia 12!!!!",
                public: null,
            }
        },

        {
            id: "2",
            type: "comment",
            timestamp: new Date(),
            content: {
                text: "Fazendo pipipi popopo",
                username: null,
                title: "Como faz n sei o que lá?",
                public: null,
            }
        },

        {
            id: "3",
            type: "feedback",
            timestamp: new Date(),
            content: {
                text: "Achei ele muito mandão af",
                username: "Matias Zoniga",
                title: null,
                public: false,
            }
        }
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
                <InteracaoProfile interacoes={inte}/>
            );
          default:
            return null;
        }
    };

    return (
        <div className="w-[100%] mt-7">
            <Header/>
            <div className="w-[100%] flex flex-row p-10 gap-10">
                <div className="w-[30%] h-screen shadow-lg flex-col rounded-lg flex items-center p-12 justify-between">
                    <div className="flex flex-col items-center w-[100%]">
                        <img src={usuario.image} alt="profile photo" className="w-64 h-64 object-cover rounded-full" />
                        <h1 className="text-[26px]" >{usuario.name}</h1>
                        <h1 className="text-[18px]" >{usuario.instructor == 1 ? 'Instructor' : 'Aprendice'}</h1>
                        {usuario.bio ? (
                            <div className="shadow-md p-4 rounded-lg w-[100%] mt-10">
                                <h1>{usuario.bio}</h1>
                            </div> 
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <div className="w-[100%] justify-end flex mb-10">
                        {usuario.isUser ? (
                            <button onClick={openModal} >
                                <Image src={editPhoto} alt="edit" className="cursor-pointer" />
                            </button>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-[70%] shadow-lg rounded-lg min-h-screen p-5 ">
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
