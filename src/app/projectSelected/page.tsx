"use client";
import { Header } from "@/components/header";
import data from '@/constants/dataProjects.json'
import { useState } from "react";
import CardMessage from "@/components/cardMessage";
import ImageComponent from "@/components/image";

const idProjectExemple = 1;
const limit = 350;
const dataItems = data.find(project => project.id == idProjectExemple);
const curUserLoggedExemple = 1

interface User{
    id : number
    image : string
    name : string
    //instructor : boolean
}
interface Feedback {
    idSender : number
    idReceptor : number
    idProject : number
    visibility : boolean
    text : string
    stars : number
}

const projectPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newMessage, setNewMessage] = useState(""); // estado para armazenar a mensagem
    const [messages, setMessages] = useState(dataItems?.messages || []); // estado para armazenar as mensagens
    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0); // estado para armazenar a avaliação com estrelas

    // Estados para controlar o feedback
    const [feedbackText, setFeedbackText] = useState(""); // texto do feedback
    const [projectFeedbacks, setProjectFeedbacks] = useState<Feedback[]>([]); // estado para armazenar os feedbacks
    const [receiverUser, setReceiverUser] = useState<number | null>(null); // usuário que vai receber o feedback
    const [publicFeedback, setPublicFeedback] = useState<boolean>(true); // se o feedback é público ou não

    // função para alternar a descrição expandida
    const toggleDescription = () => {
        setIsExpanded(prevState => !prevState);
    };

    // função para enviar a mensagem
    const send = () => {
        if (newMessage.trim()) {
            const newMessageObject = {
                id: messages.length + 1,
                text: newMessage,
                id_user: 1
            };

            // adiciona a nova mensagem na lista
            setMessages(prevMessages => [...prevMessages, newMessageObject]); 
            setNewMessage(""); // limpa o campo de texto
        }
    };

    // função para lidar com a mudança da avaliação
    const handleRating = (index: number) => {
        // definir o valor da avaliação com base no índice da estrela clicada
        setRating(index + 1); 
    };

    // função para abrir o modal e configurar os dados do receptor
    const openFeedbackModal = (user: User) => {
        setReceiverUser(user.id); 
        setOpen(true);
    };

    // função para fechar o modal
    const closeFeedbackModal = () => {
        setOpen(false); 
        setReceiverUser(null); // Reseta o receptor
        setFeedbackText(""); // limpa o texto do feedback
        setRating(0); // reseta a avaliação
    };

    // função para enviar o feedback
    const sendFeedback = () => {
        if (feedbackText.trim() && receiverUser) {
            const feedback: Feedback = {
                idProject: dataItems?.id || -1,
                idSender: curUserLoggedExemple,
                idReceptor : receiverUser,
                stars: rating,
                text: feedbackText,
                visibility : publicFeedback,
            };
            // adiciona o feedback à lista
            setProjectFeedbacks(prevFeedbacks => [...prevFeedbacks, feedback]); 
            console.log(feedback)
            closeFeedbackModal(); 
        }
    };

    return (
        <>
            <Header />

                {/* Modal de feedback */}
                {open && (
                    <div className="flex bg-[#000000A0] w-full h-full absolute items-center justify-center self-center justify-center">
                        <form className="flex-col shadow p-2 rounded bg-white-100 bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[90%]" action="">
                            <p className="text-blue1 text-3xl mb-4 my-6">Feedback</p>

                            <textarea
                                className="bg-slate-100 w-full h-[200px] outline-none p-2"
                                placeholder="Comente um pouco sobre a contribuição do seu colega"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)} // Atualiza o texto do feedback
                            ></textarea>

                            {/* sistema de avaliação com estrelas */}
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
                                <button
                                    className="bg-red-500 p-2 rounded text-white"
                                    onClick={closeFeedbackModal} // Fecha o modal
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-blue-500 p-2 rounded text-white"
                                    onClick={sendFeedback} // Envia o feedback
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Mostrando título e descrição do projeto */}
                <div className="h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100 p-6">
                    <div className="mt-24 ml-8">
                        <h1 className="text-blue1 text-3xl mb-4">
                            {dataItems?.name}
                        </h1>
                        <p className="flex flex-wrap max-w-[750px]">
                            {isExpanded || (dataItems?.description && dataItems.description.length <= limit)
                                ? dataItems?.description
                                : dataItems?.description.substring(0, limit) + "..."}
                            {dataItems?.description && dataItems.description.length > limit && (
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={toggleDescription}>
                                    {isExpanded ? "Ler menos" : "Ler mais"}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Mostrando contribuidores do projeto */}
                    <div className="flex flex-col ml-8 mt-6 w-[300px]">
                        <h1 className="text-blue1 text-3xl mb-4">Contribuidores</h1>
                        {dataItems?.users?.map((contributor, index) => (
                            <div key={index} className="flex gap-3 items-center mt-6">
                                <ImageComponent src={contributor.image} alt="" width={30} height={30} className="rounded-full object-cover aspect-square" />
                                <h1>{contributor.name}</h1>
                                <button
                                    className="flex bg-blue2 text-white self-end justify-self-end rounded p-2 hover:shadow hover:bg-blue1"
                                    onClick={() => openFeedbackModal(contributor)} // Abre o modal para o contribuidor
                                >
                                    Feedback
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* cards de mensagens */}
                <hr className="shadow" />
                <div className="flex flex-col w-11/12 p-4 justify-self-center">
                <div className="flex flex-col h-[300px] overflow-y-auto gap-3 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                    {messages.map((msg) => {
                    const exempleIdUserLogged = 1;  // id do usuário logado exemplo, vamos pegar do local stored

                    let MsgOwner =
                    {
                        name: "<Deletado>",
                        image: "",
                        id: -1
                    }; // default

                    let CurrentUser : boolean = false; // inicia como false

                    if(dataItems != undefined)
                    {
                        let users = dataItems.users;
                        for(let i = 0; i < users.length; ++i)
                        {
                            // itera sobre os usuários e envia quem enviou a msg
                            if(users[i].id === msg.id_user) 
                            {
                                MsgOwner = users[i];
                                if(users[i].id === exempleIdUserLogged)
                                {
                                    CurrentUser = true; // se for o user atual mandando mensagem
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
                    })}

                </div>
                </div>

                {/* enviar mensagens */}
                <div className="flex w-11/12 mb-6 self-center justify-self-center gap-3 items-center">
                    <input
                        className="outline-none mt-4 rounded-full p-2 bg-slate-100 w-11/12"
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)} // atualiza o estado com o valor digitado
                    />
                    <div onClick={send}>
                        <ImageComponent
                            src="sending.png"
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

const styles = {
    title: "text-blue1 text-3xl mb-4",
    checkbox: 'w-4 h-4 border-2 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 checked:bg-green-500 checked:border-green-500 transition-colors duration-200 ease-in-out'
};

export default projectPage;
