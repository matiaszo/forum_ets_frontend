"use client"

import { Header } from "@/components/header";
import { CldImage } from "next-cloudinary";
import React, { useState, useRef, useEffect } from "react";

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
  }

  interface Group {
    id: number;
    name: string;
    messages: Message[];
  }

  const [groups, setGroups] = useState<Group[]>([]); 
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);  
      try {
        const response = await fetch("http://localhost:8080/chat", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
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

    fetchGroups();  // Call the fetch function when the component mounts
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedGroup?.messages]);

  const sendMessage = () => {
    if (!selectedGroup || newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      user: {
        id: Number(localStorage.getItem("id")),
        image: "car-interior-design",
        name: "Você",
        instructor: false,
      },
    };

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? { ...group, messages: [...group.messages, newMsg] }
        : group
    );

    setGroups(updatedGroups);
    setNewMessage("");
    const updatedSelectedGroup = updatedGroups.find(
      (group) => group.id === selectedGroup.id
    );
    setSelectedGroup(updatedSelectedGroup || null);
  };

  if (loading) {
    return <div>Carregando...</div>;  // Display a loading message while the data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Display any error that occurred during the fetch
  }

  return (
    <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
      <Header instructor={false} />
      <div className="mr-20 ml-20 flex w-[100%] gap-3">
        <div className="flex flex-col gap-4 bg-white shadow-lg min-h-[100%] rounded-md p-3 items-center w-[30%]">
          <h1 className="flex items-center justify-start rounded-md w-full h-8 text-blue1 text-3xl">
            Seus grupos
          </h1>

          <div className="flex flex-col gap-4 items-center overflow-auto w-full">
            {groups.map((group) => {
              const lastMessage = group.messages[group.messages.length - 1];

              return (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`flex flex-col p-3 border-b border-blue2 w-full cursor-pointer ${
                    selectedGroup?.id === group.id ? "bg-blue-100 rounded-lg" : ""
                  }`}
                >
                  <h2 className="text-lg text-blue0">{group.name}</h2>
                  <p className="text-[15px] text-gray-700">
                    {lastMessage?.text || "Nenhuma mensagem ainda."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col rounded-lg items-center justify-start min-h-[100%] w-[70%] bg-alice">
          {selectedGroup ? (
            <>
              <div className="flex flex-col items-center justify-center w-full bg-alice p-3 rounded-t-lg ">
                <h1 className="text-xl text-blue2 mb-4 ">{selectedGroup.name}</h1>
                <hr className="w-full border-t-1 border-blue1 mt-1" />
              </div>

              <div
                className="flex flex-col bg-alice rounded-md w-[100%] p-4 h-[85%] overflow-y-auto"
                style={{ maxHeight: "70vh" }}
              >
                {selectedGroup.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center mb-4 ${
                      msg.user.id === Number(localStorage.getItem("id")) ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.user.id !== Number(localStorage.getItem("id")) && (
                      <CldImage
                        src={msg.user.image}
                        alt={msg.user.name}
                        width={40}
                        height={40}
                        radius={40}
                        crop={{
                          type: 'auto',
                          source: true
                        }}
                      />
                    )}

                    <div className="flex flex-col max-w-[70%]">
                      <div className="text-sm text-blue2 ml-3 font-bold ">
                        {msg.user.name}
                      </div>
                      <div
                        className={`p-3 rounded-lg text-white ml-3 ${
                          msg.user.id === Number(localStorage.getItem("id")) ? "bg-blue2" : "bg-blue1"
                        }`}
                      >
                        <p className="font-robFont">{msg.text}</p>
                      </div>
                    </div>

                    {msg.user.id === Number(localStorage.getItem("id")) && (
                      <CldImage
                        src={msg.user.image}
                        alt={msg.user.name}
                        width={40}
                        height={40}
                        radius={40}
                        crop={{
                          type: 'auto',
                          source: true
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
    </div>
  );
}
