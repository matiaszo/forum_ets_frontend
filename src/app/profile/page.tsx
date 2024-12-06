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
import { InteracaoProfile } from "@/components/interacaoProfile";
import plus from "@/assets/icons8-adicionar-100.png";

interface skillInterface {
    id: string;
    title: string;
    image: string;
}

interface areaOfInterest {
    id: string;
    text: string;
}


interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUseraname: string | null;
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
    const area : areaOfInterest[] = [
        {id: "1", text: 'Python'},
        {id: "2", text: 'Java'},
        {id: "3", text: 'Front'},
        {id: "4", text: 'Back'},
        {id: "5", text: 'Tudo'},
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameUserTemp, setNameUserTemp] = useState("");
    const [bio, setBio] = useState("");
    const [areas, setAreas] = useState<areaOfInterest[]>(area);
    const [newArea, setNewArea] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModalAndSave = (name: string) => {
        setNameUserTemp(name);
        console.log("Nome:", nameUserTemp);
        console.log("Bio:", bio);
        console.log("Áreas:", areas);
        closeModal();
    };

    const handleAddArea = () => {
        if (newArea.trim() !== "") {
        setAreas([
            ...areas,
            { id: String(areas.length + 1), text: newArea.trim() },
        ]);
        setNewArea("");
        }
    };

    const handleRemoveArea = (id: string) => {
        setAreas(areas.filter((area) => area.id !== id));
    };

    const handleAreaChange = (id: string, newText: string) => {
        setAreas(
        areas.map((area) =>
            area.id === id ? { ...area, text: newText } : area
        )
        );
    };

    
    const usuario : user = {id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: 'xmarimarquesh', instructor: 1, isUser: true}
    
    const feed : feedback[] = [
        {id: "1", stars: 2, text: "mais ou menos boa", public: true, projectName: "Projeto JAVA FINAL", user: {id: '1', name: 'Kau Menendez', image: "https://borboletariodesaopaulo.com.br/wp-content/uploads/2024/03/borboleta-monarca-foto-macro.jpg", isUser: true}},
        {id: "2", stars: 4, text: "Muito n sei o que n sei o que lá", public: false, projectName: "Projeto de IoT", user: {id: '1', name: 'Matias Zoniga', image: "https://s2.glbimg.com/RFnG4EgIzgmpejlSjWA8K3apZ5M=/e.glbimg.com/og/ed/f/original/2016/04/15/tiger-02.jpg", isUser: true}}
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
                public: true,
            }
        },
        {
            id: "4",
            type: "feedback",
            timestamp: new Date(),
            content: {
                text: "Achei ele muito mandão af",
                username: "Matias Zoniga",
                title: null,
                public: true,
            }
        },

        {
            id: "5",
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
            id: "6",
            type: "like",
            timestamp: new Date(),
            content: {
                text:  null,
                username: "usuario123",
                title: "Integração dia 12!!!!",
                public: null,
            }
        },
    ];

    const [nameUser, setNameUser] = useState(usuario.name);
    
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
                        <h1 className="text-[26px] font-robFont mt-2" >{usuario.name}</h1>
                        <h1 className="text-[18px] font-robFont" >{usuario.instructor == 1 ? 'Instructor' : 'Aprendice'}</h1>
                        {usuario.bio ? (
                            <div className="shadow-md p-4 rounded-lg w-[100%] mt-1">
                                <h1 className="text-[20px] font-robFont flex flex-col">About me</h1>
                                <h1 className="font-robFont ml-3">{usuario.bio}</h1>
                            </div> 
                        ) : (
                            <>
                            </>
                        )}
                        
                            
                            {area && area.length > 0 ? (
                                <div className="shadow-lg rounded-lg p-5 mt-5 w-[100%]">
                                    <h1 className="text-[20px] font-robFont flex flex-col">Areas of interest</h1>
                                    {area.map(area => (
                                        <div key={area.id}>
                                            <li className="font-robFont ml-3 marker:text-blue2">{area.text}</li>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <></> 
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
                    <h1 className="text-[18px] font-robFont mb-5">Editar Perfil</h1>
                    <img src={usuario.image} alt="profile photo" className="w-64 h-64 object-cover rounded-full"/>
                    <label htmlFor="name" className="mt-3 text-[18px] w-[100%]">Nome</label>
                    <input type="text" value={nameUserTemp} onChange={(e) => setNameUserTemp(e.target.value)} className="w-[100%] border-b-2 border-blue3 outline-none p-2" placeholder="Seu nome..."/>
                    <label htmlFor="bio" className="mt-3 text-[18px] w-[100%]">Biografia</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-[100%] rounded-sm border-2 border-blue3 outline-none p-2" placeholder="Sua biografia..." />
                    <label htmlFor="areas" className="mt-3 text-[18px] w-[100%]">Áreas de Interesse</label>
                    <div className="w-[100%]">
                        <div className="max-h-32 overflow-y-auto mb-4">
                            {areas.map((area) => (
                                <div key={area.id} className="flex items-center mb-2">
                                    <input type="text" value={area.text} onChange={(e) => handleAreaChange(area.id, e.target.value)} className="w-[80%] border-b-2 border-blue3 outline-none p-2"/>
                                    <button onClick={() => handleRemoveArea(area.id)}className="ml-2 text-red-500">Excluir</button>
                                </div>
                            ))}
                        </div>
                        <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)}className="w-[80%] border-b-2 border-blue3 outline-none p-2 mt-2" placeholder="Adicionar nova área" />
                        <button onClick={handleAddArea} className="px-4 py-2" ><Image src={plus} width={30} height={30} alt="Image"/></button>
                    </div>
                    <div className="w-[100%] flex items-end justify-end mt-5">
                        <button onClick={() => closeModalAndSave(nameUserTemp)} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900">Salvar</button>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black">Fechar</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
