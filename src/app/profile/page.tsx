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
import trash from "@/assets/trash-bin.png";

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

    const getUserData = async (token: string | null, id: string | null) => {

        if(!id){
            return;
        }
        
        const response = await fetch(`http://localhost:8080/profile/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
      
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
      
        const data = await response.json();
        return data;
    };
      
    // Exemplo de uso:
    const token : string | null = localStorage.getItem("token");
    const id : string | null = localStorage.getItem("id");
    getUserData(token, id)
        .then(data => {
          console.log('Dados do usuário:', data);
    })
        .catch(error => {
          console.error('Erro:', error);
    });

    const response = {
        id: 1,
        edv: "123456",
        password: "******",
        name: "John Doe",
        email: "john.doe@example.com",
        instructor: true,
        github: "xmarimarquesh",
        bio: "Software developer",
        image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg",
        isUser: true,
        skills: [
            {id: '1', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
            {id: '2', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
            {id: '3', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
            {id: '4', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
            {id: '5', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
            {id: '6', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        ],
        interests: [
            { id: 1, name: "Frontend" },
            { id: 2, name: "Backend" },
            { id: 3, name: "Backend" },
            { id: 4, name: "Backend" },
            { id: 5, name: "Backend" },
            { id: 6, name: "Backend" },
        ],
    };
    
    const mapUserData = (data: typeof response): user => {
        return {
            id: String(data.id),
            name: data.name,
            image: data.image,
            bio: data.bio,
            gitUseraname: data.github || null, 
            instructor: data.instructor ? 1 : 0,
            isUser: data.isUser, 
        };
    };
    
    const mapSkills = (skills: typeof response.skills): skillInterface[] => {
        return skills.map(skill => ({
            id: String(skill.id), 
            title: skill.title,
            image: skill.image,
        }));
    };
    
    const mapInterests = (interests: typeof response.interests): areaOfInterest[] => {
        return interests.map(interest => ({
            id: String(interest.id), 
            text: interest.name,
        }));
    };
    
    const userData = mapUserData(response);
    const skillData = mapSkills(response.skills);
    const interests = mapInterests(response.interests);
    
    console.log('USER:',userData);
    console.log('SKILL:',skillData);
    console.log('INTEREST:',interests);

    const [activeTab, setActiveTab] = useState('inicio');
    const [theme, setTheme] = useState('dark');
    
    const [usuario, setUsuario] = useState(userData);
    const [areas, setAreas] = useState<areaOfInterest[]>(interests);
    const [skills, setSkills] = useState<skillInterface[]>(skillData);

    // --- MODAL

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameUserTemp, setNameUserTemp] = useState("");
    const [bio, setBio] = useState("");
    const [newArea, setNewArea] = useState("");

    
    const [newSkill, setNewSkill] = useState("");

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
    
    const handleAddSkill = () => {
        console.log("ADICIONANDO SKILL")
        if (newSkill.trim() !== "") {
            const exists = skills.some((skill) => skill.title === newSkill.trim());
            if (!exists) {
                setSkills([
                    ...skills,
                    {
                        id: String(skills.length + 1),
                        title: newSkill.trim(),
                        image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg",
                    },
                ]);
                setNewSkill("");
            } else {
                alert("Skill já adicionada!");
            }
        }
    };

    const handleRemoveSkill = (id: string) => {
        setSkills(skills.filter((skill) => skill.id !== id));
    };
    
    
    const feed : feedback[] = [
        {id: "1", stars: 2, text: "mais ou menos boa", public: true, projectName: "Projeto JAVA FINAL", user: {id: '1', name: 'Kau Menendez', image: "https://borboletariodesaopaulo.com.br/wp-content/uploads/2024/03/borboleta-monarca-foto-macro.jpg", isUser: true}},
        {id: "2", stars: 4, text: "Muito n sei o que n sei o que lá", public: false, projectName: "Projeto de IoT", user: {id: '1', name: 'Matias Zoniga', image: "https://s2.glbimg.com/RFnG4EgIzgmpejlSjWA8K3apZ5M=/e.glbimg.com/og/ed/f/original/2016/04/15/tiger-02.jpg", isUser: true}}
    ];
    

    const skillDisponivel : skillInterface[] = [
        {id: '1', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '2', title: 'FrontEnd', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '3', title: 'Java', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '4', title: 'Sei lá', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '5', title: 'BackEnd', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '6', title: '5S', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '7', title: 'Kambam', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '8', title: 'Ingles', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '9', title: 'Alemao', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '11', title: 'Portugues', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '12', title: 'Mysql', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '13', title: 'Sei lá2', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '14', title: 'IoT', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}
    ]

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
                <InicioProfile usuario={usuario} skills={skills} />
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

    // IMAGEMMMM

    const [image, setImage] = useState(usuario.image);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; 
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setUsuario((prevUsuario) => ({
              ...prevUsuario,
              image: reader.result as string,
            }));
            setImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
    };
    return (
        <div className="w-[100%] mt-7">
            <Header/>
            <div className="w-[100%] flex flex-row p-10 gap-10">
                <div className="w-[30%] min-h-[80%] shadow-lg flex-col rounded-lg flex items-center p-12 justify-between">
                    <div className="flex flex-col items-center w-[100%]">
                        <img src={image} alt="profile photo" className="w-64 h-64 object-cover rounded-full" />
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
                        
                            {areas && areas.length > 0 ? (
                                <div className="shadow-md rounded-lg p-5 mt-5 w-[100%]">
                                    <h1 className="text-[20px] font-robFont flex flex-col">Areas of interest</h1>
                                    {areas.map(area => (
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
                <div className="w-[70%] shadow-lg rounded-lg min-h-[80%] p-5 ">
                    <HeaderProfile activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="pt-2 ">
                        {renderTabContent()}
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal} className="m-0">
                    <div className="max-h-[90vh] overflow-y-auto flex flex-col w-[100%] items-center scrollbar scrollbar-thumb-blue5 scrollbar-track-gray-100 gap-2 p-2">
                        <h1 className="text-[32px] mt-5 font-robFont ">Editar Perfil</h1>
                        <div className="flex flex-col items-center space-y-4">
                            <input type="file" accept="image/*" capture="environment" id="cameraInput" onChange={handleImageChange} className="hidden" />
                            <label htmlFor="cameraInput" className="cursor-pointer">
                            {image ? (
                                <img src={image} alt="Foto de Perfil" className="w-32 h-32 object-cover rounded-full" />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    Sem Foto
                                </div>
                            )}
                            </label>
                        </div>
                        <label htmlFor="name" className="mt-3 text-[18px] w-[100%]">Nome</label>
                        <input type="text" value={usuario.name} onChange={(e) => setNameUserTemp(e.target.value)} className="w-[100%] border-b border-blue3 outline-none p-2" placeholder="Seu nome..."/>
                        <label htmlFor="name" className="mt-3 text-[18px] w-[100%]">GitHub Username</label>
                        <input type="text" value={usuario.gitUseraname ? usuario.gitUseraname : ''} onChange={(e) => setNameUserTemp(e.target.value)} className="w-[100%] border-b border-blue3 outline-none p-2" placeholder="Seu username do github..."/>
                        <label htmlFor="bio" className="mt-3 text-[18px] w-[100%]">Biografia</label>
                        <textarea value={usuario.bio} onChange={(e) => setBio(e.target.value)} className="w-[100%] min-h-24 rounded-sm border border-blue3 outline-none p-2" placeholder="Sua biografia..." />
                        <label htmlFor="areas" className="mt-3 text-[18px] w-[100%]">Áreas de Interesse</label>
                        <div className="w-[100%]">
                            <div className="max-h-32 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                                {areas.map((area) => (
                                    <div key={area.id} className="flex items-center mb-2">
                                        <h2 className="w-[80%] border-b border-blue3 outline-none p-2">{area.text}</h2>
                                        <button onClick={() => handleRemoveArea(area.id)}className="ml-2 text-red-500"><Image src={trash} width={24} height={24} alt=""/></button>
                                    </div>
                                ))}
                            </div>
                            <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)}className="w-[80%] border-b border-blue3 outline-none p-2 mt-2" placeholder="Adicionar nova área" />
                            <button onClick={handleAddArea} className="px-4 py-2" ><Image src={plus} width={30} height={30} alt="Image"/></button>
                        </div>
                        <label htmlFor="areas" className="mt-3 text-[18px] w-[100%]">Skills</label>
                        <div className="w-[100%]">
                            <div className="max-h-32 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                                {skills.map((sk) => (
                                    <div key={sk.id} className="flex items-center mb-2">
                                        <h2 className="w-[80%] border-b border-blue3 outline-none p-2">{sk.title}</h2>
                                        <button onClick={() => handleRemoveSkill(sk.id)}className="ml-2 text-red-500"><Image src={trash} width={24} height={24} alt=""/></button>
                                    </div>
                                ))}
                            </div>
                            <select name="skills" id="skills" className="w-[80%] border-b border-blue3 outline-none p-2 mt-2" onChange={(e) => setNewSkill(e.target.value)}>
                                <option value="">Selecione uma skill</option>
                                {skillDisponivel.map((skill) => (
                                    <option key={skill.id} value={skill.title}>{skill.title}</option>
                                ))}
                            </select>
                            <button onClick={handleAddSkill} className="px-4 py-2" ><Image src={plus} width={30} height={30} alt="Image"/></button>
                        </div>
                        <div className="w-[100%] flex items-end justify-end mt-5">
                            <button onClick={() => closeModalAndSave(nameUserTemp)} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900">Salvar</button>
                            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black">Fechar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
