"use client";
import { Header } from "@/components/header";
import { useEffect, useState } from "react";
import CardMessage from "@/components/cardMessage";
import ImageComponent from "@/components/image";
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from "next/image";
import flecha from "@/assets/sending.png"

const limit = 350;

interface User {
    id: number;
    image: string;
    name: string;
}

interface Feedback {
    idUser: number;
    idProject: number;
    text: string;
    stars: number;
}

interface userCommentDto {
    id: number;
    name: string;
    instructor: boolean;
    image: string;
}

interface projectMenssageDto {
    id: number;
    text: string;
    id_user: number;
}

interface dataProject {
    id: number;
    name: string;
    Description: string;
    goals: string[];
    users: userCommentDto[];
    messages: projectMenssageDto[];
}

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    email: string;
    edv: string;
    gitUsername: string;
    instructor: number;
    isUser: boolean;
  }
  

const projectPage = () => {
    const [data, setData] = useState<dataProject | undefined>();
    const [isExpanded, setIsExpanded] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<projectMenssageDto[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [feedbackText, setFeedbackText] = useState("");
    const [projectFeedbacks, setProjectFeedbacks] = useState<Feedback[]>([]);
    const [receiverUser, setReceiverUser] = useState<number | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [usuario, setUsuario] = useState<user>({
        id: '',
        name: '',
        image: '',
        bio: '',
        gitUsername: '',
        email: '',
        edv: '',
        instructor: 0,
        isUser: false,
    });

    let tokenToGet: string | null;
    
    useEffect(() => {

        let user = localStorage.getItem("user");
        if(user != null)
        {
          setUsuario(JSON.parse(user))
        }

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (id) {
            tokenToGet = localStorage.getItem('token');
            const getData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/project/${id}`, {
                        headers: {
                            Authorization: `Bearer ${tokenToGet}`,
                        },
                    });
                    setData(response.data);
                    // console.log(response.data)
                    setMessages(response.data.messages || []);
                } catch (error) {
                    console.log(`Erro na requisição ${error}`);
                }
            };
            getData();
        }
    }, []);

    if (!data) {
        return <div>Carregando...</div>;
    }

    if (data && !data?.name) {
        return <div>Erro ao carregar dados do projeto.</div>;
    }

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    const toggleDescription = () => {
        setIsExpanded(prevState => !prevState);
    };

    const send = () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('id')
    
        if (newMessage.trim()) {
            const newMessageObject = {
                text: newMessage,
            };
    
            const postMessage = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/project/${id}`, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newMessageObject),
                    });
    
                    if (!response.ok) {
                        console.log('Erro:', response.status);
                    } else {
                        // Adiciona a nova mensagem no estado local
                        setMessages(prevMessages => [
                            ...prevMessages,
                            {
                                id: new Date().getTime(), 
                                text: newMessage,
                                id_user: parseInt(idUser? idUser : '-1') , 
                            },
                        ]);
                    }
                    
                } catch (error) {
                    console.log('Erro ao enviar a mensagem:', error);
                }
            };
    
            if (token &&  params && id) 
                postMessage();
    
            setNewMessage(""); // Limpa o campo de mensagem
        }
    };
    

    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    const openFeedbackModal = (user: User) => {
        setReceiverUser(user.id);
        setOpen(true);
    };

    const closeFeedbackModal = () => {
        setOpen(false);
        setReceiverUser(null);
        setFeedbackText("");
        setRating(0);
    };

    const sendFeedback = () => {
        if (feedbackText.trim() && receiverUser) {
            const feedback: Feedback = {
                idProject: data.id,
                // idSender: ,
                idUser: receiverUser,
                stars: rating,
                text: feedbackText,
                // visibility: publicFeedback,
            };

            const send = async () => {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8080/profile/feedback', {
                    method: 'POST',
                    headers : {
                        Authorization : `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedback)
                })

                if (!response.ok) {
                    console.error('Erro ao enviar feedback:', response.status);
                    
                } else {
                    console.log('Feedback enviado com sucesso');
                }
            }

            if(feedback)
                send()

            setProjectFeedbacks(prevFeedbacks => [...prevFeedbacks, feedback]);
            console.log(feedback);
            closeFeedbackModal();
        }
    };

    return (
        <>
            <Header instructor={usuario.instructor ? true : false} toggleTheme={toggleTheme} />
            {/* Modal de feedback */}
            {open && (
                <div className="flex bg-[#000000A0] w-full h-full absolute items-center self-center justify-center">
                    <form className="flex-col bg-white-100 bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[90%]" action="">
                        <p className="text-blue1 text-3xl mb-4 my-6">Feedback</p>
                        <textarea
                            className="bg-slate-100 w-full h-[200px] outline-none p-2"
                            placeholder="Comente um pouco sobre a contribuição do seu colega"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>
                        <div className="flex gap-2 mt-4">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`cursor-pointer ${rating > index ? 'text-yellow-400' : 'text-gray-400'}`}
                                    onClick={() => handleRating(index)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button className="bg-red-500 p-2 rounded text-white" onClick={closeFeedbackModal}>
                                Cancelar
                            </button>
                            <button className="bg-blue-500 p-2 rounded text-white" onClick={sendFeedback}>
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        
            {/* Renderização dados carregados */}
            <div className="h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100 p-6">
                <div className="mt-24 ml-8">
                    <h1 className="text-blue1 text-3xl mb-4">{data.name}</h1>
                   
                    <p className="flex flex-wrap max-w-[750px]">
                        {isExpanded || (!data.Description || data.Description.length <= limit)
                            ? data.Description
                            : data.Description.substring(0, limit) + "..."}
                        {data.Description && data.Description.length > limit && (
                            <span className="text-blue-500 cursor-pointer" onClick={toggleDescription}>
                                {isExpanded ? "Ler menos" : "Ler mais"}
                            </span>
                        )}
                    </p>

                <h1 className="text-blue1 text-3xl mb-4 mt-4">Objetivos</h1>
                <div className="flex flex-col mt-6 gap-3 items-start " >
                 {data.goals.map((item, index) => {
                    return(
                            <div key={index} className="flex gap-3" >
                                <input type="checkbox" />
                                <p>{item}</p>
                            </div>
                        )
                    })}
                </div>

                </div>

                {/* Mostrando contribuidores do projeto */}
                <div className="flex flex-col ml-8 mt-6 w-[300px]">
                    <h1 className="text-blue1 text-3xl mb-4">Contribuidores</h1>
                    {data.users?.map((contributor, index) => {
                        if(contributor.id !== Number(localStorage.getItem('id'))) {
                            return(

                                <div key={index} className="flex gap-3 items-center mt-6">
                                    <ImageComponent src={contributor.image} alt="" width={30} height={30} className="rounded-full object-cover aspect-square" />
                                    <h1>{contributor.name}</h1>
                                    <button
                                        className="flex bg-blue2 text-white self-end justify-self-end rounded p-2 hover:shadow hover:bg-blue1"
                                        onClick={() => openFeedbackModal(contributor)}
                                    >
                                        Feedback
                                    </button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            {/* Exibição de mensagens */}
            <hr className="shadow" />
            <div className="flex flex-col w-11/12 p-4 justify-self-center">
                <div className="flex flex-col h-[300px] overflow-y-auto gap-3 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                    {messages.length === 0 ? (
                        <div>Nenhuma mensagem ainda.</div>
                    ) : (
                        messages.map((msg) => {
                      
                            let MsgOwner = { name: "<Deletado>", image: "", id: -1 }; // Default
                            let CurrentUser = false;

                            if (data) {
                                const users = data.users;
                                const idUser = localStorage.getItem('id')
                                for (let i = 0; i < users.length; ++i) {
                                    if (users[i].id === msg.id_user) {
                                        MsgOwner = users[i];
                                        if (users[i].id === parseInt(idUser? idUser : '-1')) {
                                            CurrentUser = true;
                                        }
                                        break;
                                    }
                                }
                            }

                            return (
                                <div key={msg.id}>
                                    <CardMessage
                                        user={MsgOwner.name}
                                        curUser={CurrentUser}
                                        text={msg.text}
                                        image={MsgOwner.image}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Campo de envio de mensagem */}
            <div className="flex w-11/12 mb-6 self-center justify-self-center gap-3 items-center">
                <input
                    className="outline-none mt-4 rounded-full p-2 bg-slate-100 w-11/12"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <div onClick={send}>
                    <Image
                        src={flecha}
                        width={50}
                        height={50}
                        alt="Enviar"
                        className="rounded-full self-center justify-self-center bg-slate-100 p-2 cursor-pointer hover:shadow hover:bg-blue1 ease-in-out duration-300"
                    />
                </div>
            </div>
        </>
    );
};

export default projectPage;
