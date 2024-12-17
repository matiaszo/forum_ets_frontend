  "use client"

  import { Header } from "@/components/header";
  import { CldImage } from "next-cloudinary";
  import React, { useState, useRef, useEffect } from "react";
  import plus from "@/assets/icons8-adicionar-100.png"
  import Image from "next/image";

  export default function Chat() {
    interface User {
      id: number;
      image: string;
      name: string;
      instructor: boolean;
    }

    interface Message {
      id: number;
      text: string;
      user: User;
      date: string;
    }

    interface IChat {
      id: number;
      name: string;
      messages: Message[];
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

    interface ISimpleGroup {
      id: number;
      name: string;
      messages: Message[];
      lastMessage: string;
    }

    const [groups, setGroups] = useState<ISimpleGroup[]>([]);
    const [chat, setChat] = useState<IChat | null>();
    const [selectedGroup, setSelectedGroup] = useState<Number | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string | undefined>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/chat", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError("Erro ao carregar os grupos");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      let user = localStorage.getItem("user");
      if(user != null)
      {
          setUsuario(JSON.parse(user))
      }
      

      fetchGroups(); // Call the fetch function when the component mounts
    }, []);

    const fetchMessagesForSelectedGroup = async () => {
      if (!selectedGroup) return;

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/chat/${selectedGroup}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();

        console.log(data);
        setChat(data);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    }

    // Fetch messages when a group is selected
    useEffect(() => {
      fetchMessagesForSelectedGroup();
    }, [selectedGroup]);

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [chat?.messages]);

    const createChat = async () => {

      if (title?.trim() === "") return;

      try {
        await fetch(`http://localhost:8080/chat`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
          }),
        });
      } catch (err) {
        console.error("Error creating chat", err);
      }

      setIsModalOpen(false)
      fetchGroups()
    }

    // Send a new message
    const sendMessage = async () => {
      if (!selectedGroup || newMessage.trim() === "") return;

      const newMsg: Message = {
        id: Date.now(),
        date: Date.now().toString(),
        text: newMessage,
        user: {
          id: Number(localStorage.getItem("id")),
          image: "car-interior-design",
          name: "Você",
          instructor: Number(localStorage.getItem("id")) == 1 ? true : false,
        },
      };

      try {
        await fetch(`http://localhost:8080/chat/${selectedGroup}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newMessage,
          }),
        });
      } catch (err) {
        console.error("Error sending message", err);
      }

      fetchMessagesForSelectedGroup();
    };

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
        <Header instructor={usuario.instructor ? true : false} />
        <div className="mr-20 ml-20 flex w-[100%] gap-3">
          <div className="flex flex-col gap-4 bg-white shadow-lg min-h-[100%] rounded-md p-3 items-center w-[30%]">
            <h1 className={`flex items-center rounded-md w-full h-8 text-blue1 text-3xl ${localStorage.getItem("instructor") == "1" ? "flex justify-between" : "hidden justify-start"}`}>
              Seus grupos
              <div className="w-auto" onClick={openModal}> 
                <Image src={plus} width={50} height={50} alt="Criar Chat" />
              </div>
            </h1>

            <div className="flex flex-col gap-4 items-center overflow-auto w-full">
              {groups.map((group) => {
                const lastMessage = group.lastMessage;

                return (
                  <div
                    key={group.id}
                    onClick={() => { setSelectedGroup(group.id); console.log(group); }}
                    className={`flex flex-col p-3 border-b border-blue2 w-full cursor-pointer ${selectedGroup === group.id ? "bg-blue-100 rounded-lg" : ""}`}
                  >
                    <h2 className="text-lg text-blue0">{group.name}</h2>
                    <p className="text-[15px] text-gray-700">{lastMessage}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col rounded-lg items-center justify-start min-h-[100%] w-[70%] bg-alice">
            {chat ? (
              <>
                <div className="flex flex-col items-center justify-center w-full bg-alice p-3 rounded-t-lg">
                  <h1 className="text-xl text-blue2 mb-4">{chat.name}</h1>
                  <hr className="w-full border-t-1 border-blue1 mt-1" />
                </div>

                <div
                  className="flex flex-col bg-alice rounded-md w-[100%] p-4 h-[85%] overflow-y-auto"
                  style={{ maxHeight: "70vh" }}
                >
                  {chat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-center mb-4 ${msg.user.id === Number(localStorage.getItem("id")) ? "justify-end" : "justify-start"}`}
                    >
                    <CldImage
                      src={msg.user.image?.trimStart() || "segsnhic8wvgxhmcmj5w"} // Ensure no unwanted spaces and use fallback image if empty
                      alt={msg.user.name}
                      width={40}
                      height={40}
                      radius={40}
                      crop={{
                        type: 'auto',
                        source: true,
                      }}
                    />

                      

                      <div className="flex flex-col max-w-[70%]">
                        <div className="text-sm text-blue2 ml-3 font-bold">
                          {msg.user.name}
                        </div>
                        <div
                          className={`p-3 rounded-lg text-white ml-3 ${msg.user.id === Number(localStorage.getItem("id")) ? "bg-blue2" : "bg-blue1"}`}
                        >
                          <p className="font-robFont">{msg.text}</p>
                        </div>
                      </div>

                      {msg.user.id === Number(localStorage.getItem("id")) && (
                        <CldImage
                          src={msg.user.image || "xjlzp7la2pcpac629a85"} // Provide a fallback image if image is null
                          alt={msg.user.name}
                          width={40}
                          height={40}
                          radius={40}
                          crop={{
                            type: 'auto',
                            source: true,
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex w-[90%] mt-4 mb-5">
                  <input
                    type="text"
                    className="flex-1 p-3 rounded-md border-2 border-blue-200 mr-2 outline-none font-robFont"
                    placeholder="Digite sua mensagem"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-blue2 text-white rounded-md"
                    onClick={sendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-xl font-robCondensed text-blue2">
                Selecione um grupo para começar o chat
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
              <div className="bg-white p-12 rounded-lg w-[600px] ">
                  <h1 className="text-blue1 text-3xl font-robCondensed">Adicionar Chat</h1>
                  <input 
                    type="text" 
                    placeholder="Digite o título do chat" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "
                  />
                <div className="w-[100%] flex items-end justify-end mt-5">
                  <button 
                    type="button"
                    onClick={createChat} 
                    className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
                  >
                    Criar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
                  >
                    Fechar
                  </button>
                </div>
                
              </div>
            </div>
          )}
      </div>
    );
  }
