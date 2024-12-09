"use client"

import { Header } from "@/components/header";
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

  const mockGroupMessages: Group[] = [
    {
      id: 1,
      name: "Grupo1",
      messages: [
        {
          id: 101,
          text: "E aí, pessoal?",
          user: {
            id: 1,
            image: "https://via.placeholder.com/40",
            name: "João",
            instructor: false,
          },
        },
        {
          id: 102,
          text: "Vamos sair amanhã?",
          user: {
            id: 2,
            image: "https://via.placeholder.com/40",
            name: "Maria",
            instructor: true,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Grupo2",
      messages: [
        {
          id: 201,
          text: "Bom dia, família!",
          user: {
            id: 3,
            image: "https://via.placeholder.com/40",
            name: "Carlos",
            instructor: false,
          },
        },
        {
          id: 202,
          text: "Alguém já falou com a avó hoje?",
          user: {
            id: 4,
            image: "https://via.placeholder.com/40",
            name: "Ana",
            instructor: true,
          },
        },
      ],
    },
  ];

  const [groups, setGroups] = useState<Group[]>(mockGroupMessages);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling to the end

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedGroup?.messages]); // Trigger scroll whenever messages change

  const sendMessage = () => {
    if (!selectedGroup || newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      user: {
        id: 5,
        image: "https://via.placeholder.com/40",
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

  return (
    <div className="flex flex-row mt-20 justify-between min-h-[90vh] font-robFont">
      <Header />
      <div className="mr-20 ml-20 flex w-[100%] gap-3">
        <div className="flex flex-col gap-4 bg-white shadow-lg min-h-[100%] rounded-md p-3 items-center w-[30%]">
          <h1 className="flex items-center justify-center rounded-md w-[60%] text-center h-8 text-black text-[24px]">
            Seus grupos
          </h1>

          <div className="flex flex-col gap-4 items-center overflow-auto w-[90%]">
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

        <div className="flex flex-col rounded-lg items-center justify-center min-h-[100%] w-[70%] bg-alice">
          {selectedGroup ? (
            <>
              <div className="flex flex-col items-center justify-center w-full bg-alice p-3 rounded-t-lg ">
                <h1 className="text-xl text-blue3 ">{selectedGroup.name}</h1>
                <hr className="w-full border-t-1 border-blue1 mt-1" />
              </div>

              <div
                className="flex flex-col bg-alice rounded-md w-[100%] p-4 h-[85%] overflow-y-auto"
                style={{ maxHeight: "70vh" }} // Fixed height for the messages container
              >
                {selectedGroup.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center mb-4 ${
                      msg.user.id === 5 ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.user.id !== 5 && (
                      <img
                        src={msg.user.image}
                        alt={msg.user.name}
                        className="w-8 h-8 rounded-full mr-2 mt-2"
                      />
                    )}

                    <div className="flex flex-col max-w-[70%]">
                      <div className="text-sm text-blue2 mb-1">
                        {msg.user.name}
                      </div>
                      <div
                        className={`p-3 rounded-lg text-white ${
                          msg.user.id === 5 ? "bg-blue1" : "bg-blue0"
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>

                    {msg.user.id === 5 && (
                      <img
                        src={msg.user.image}
                        alt={msg.user.name}
                        className="w-8 h-8 rounded-full ml-2 mt-2"
                      />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} /> {/* This element is used to trigger scroll */}
              </div>

              <div className="flex w-[90%] mt-4 mb-5">
                <input
                  type="text"
                  className="flex-1 p-3 rounded-md border-2 border-blue-200 mr-2 outline-none"
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
            <div className="flex items-center justify-center h-full text-xl font-bold">
              Selecione um grupo para começar o chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
