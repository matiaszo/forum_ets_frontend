"use client"
import { Header } from "@/components/header";
import { HeaderProfile } from "@/components/headerProfile";
import { useState } from "react";
import Image from "next/image";
import profilePhoto from "@/assets/Koala.jpg";
import editPhoto from "@/assets/edit.png";
import {Modal} from "@/components/Modal";

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

export default function Home() {
    const [activeTab, setActiveTab] = useState('inicio');
    
    const [selectedColor, setSelectedColor] = useState("blue"); 
    const [showColors, setShowColors] = useState(false); 
    
    const [bio, setBio] = useState("Oiê ME CHAMO MARI"); 

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
    
    const [nameUser, setNameUser] = useState(usuario.name);
    const [nameUserTemp, setNameUserTemp] = useState(usuario.name);

    const teste : skillInterface[] = [
        {id: '1', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '2', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '3', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '4', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '5', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '6', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '7', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '8', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '9', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '11', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '12', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '13', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '14', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}
    ]

    const [skills, setSkills] = useState<skillInterface[]>([]);

    
    const colors = ["red", "blue", "green", "black", "purple"];
    const themes: { [key: string]: string } =  theme == 'dark' ? {
        red: "shadow_red",
        blue: "transparent",
        green: "shadow_green",
        black: "graywhite",
        purple: "buefy",
    } : {
        red: "maroongold",
        blue: "github_dark",
        green: "merko",
        black: "dark",
        purple: "midnight-purple",
    }
    
    
    const [gitTheme, setGitTheme] = useState(themes.blue);
    
    const renderTabContent = () => {
        switch (activeTab) {
          case 'inicio':
            return (
                <div className="">
                {usuario.gitUseraname ?
                (
                    <div className="w-[100%] mb-10">
                        <div className="shadow-lg w-[100%] h-1/2 rounded-lg p-5">
                            <h1 className="text-[22px] font-robFont mb-2">GitHub Status</h1>
                            <div className="flex flex-row w-[100%] items-center justify-center">
                                <img src={`https://github-readme-stats.vercel.app/api?username=${usuario.gitUseraname}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=false&count_private=false&disable_animations=false&theme=${gitTheme}&locale=en&hide_border=true`} className="h-[250px]" alt="stats graph"  />
                                <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${usuario.gitUseraname}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=12&theme=${gitTheme}&hide_border=true`} className="h-[250px]" alt="languages graph"  />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button
                                    style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: selectedColor,
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                    }}
                                    onClick={() => setShowColors(!showColors)} 
                                />

                                {showColors && (
                                    <div style={{ display: "flex", gap: "10px" }}>
                                    {colors.map((color) => (
                                        <button
                                        key={color}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: color,
                                            border: "1px solid #ccc",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setGitTheme(themes[color]);
                                            setShowColors(false);
                                        }}
                                        />
                                    ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <div className="w-[100%] mb-10">
                        <div className="shadow-lg w-[100%] h-1/2 rounded-lg p-5">
                            <h1 className="cursor-pointer">Add GitHub Status</h1>
                        </div>
                    </div>
                )}

                { teste && teste.length > 0 ? (
                    <div className="w-[100%] mb-10">
                        <div className="shadow-lg w-[100%] h-1/2 rounded-lg pt-10 pb-10 p-5">
                            <h1 className="text-[22px] font-robFont mb-2">Skills</h1>
                            <div className="flex flex-wrap gap-5 items-center justify-center">
                                {teste.map((skill) => (
                                    <div key={skill.id} className="flex flex-col items-center">
                                        <img 
                                            src={skill.image} 
                                            alt={skill.title} 
                                            width={100} 
                                            height={100} 
                                            />
                                        <h3>{skill.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                ) : (
                        <div className="w-[100%] mb-10">
                            <div className="shadow-lg w-[100%] h-1/2 rounded-lg p-5">
                                <h1 className="cursor-pointer">Add Skills</h1>
                            </div>
                        </div>
                    )
                }
                
                </div>
            )
          case 'feedback':
            return (
                <div>Conteúdo da aba Feedback</div>
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
