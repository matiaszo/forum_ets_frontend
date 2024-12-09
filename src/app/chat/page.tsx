"use client";

import { Header } from "@/components/header";
import React, { useState, useEffect } from "react";

export default function Chat() {
  interface Message {
    id: string;
    text: string;
    sender: string;
  }

  interface Group {
    id: string;
    name: string;
    messages: Message[];
  }

  const mockGroupMessages: Group[] = [
    {
      id: "1",
      name: "Grupo1",
      messages: [
        { id: "101", text: "E aí, pessoal?", sender: "user" },
        { id: "102", text: "Vamos sair amanhã?", sender: "group" },
      ],
    },
    {
      id: "2",
      name: "Grupo2",
      messages: [
        { id: "201", text: "Bom dia, família!", sender: "user" },
        { id: "202", text: "Alguém já falou com a avó hoje?", sender: "group" },
      ],
    },
    {
      id: "3",
      name: "Grupo3",
      messages: [
        { id: "301", text: "Reunião às 15h no Zoom", sender: "group" },
        { id: "302", text: "Não vou esquecer, obrigado!", sender: "user" },
      ],
    },
  ];

  const [groups, setGroups] = useState<Group[]>(mockGroupMessages);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const sendMessage = async () => {
    if (!selectedGroup || newMessage.trim() === "") return;

    const newMsg: Message = {
      id: `${Date.now()}`, 
      text: newMessage,
      sender: "user",
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

    try {
      await fetch("https://api.example.com/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: selectedGroup.id, message: newMsg }),
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="flex flex-row mt-20 justify-between min-h-[90vh]">
      <Header/>
      <div className="mr-20 ml-20 flex w-[100%] gap-3">

      <div className="flex flex-col gap-4 bg-blue1 min-h-[100%] rounded-md p-3 items-center w-[30%]">
        <h1 className="flex items-center justify-center bg-blue4 rounded-md w-[60%] text-center h-8">
          Seus grupos
        </h1>

        <div className="flex flex-col gap-4 items-center overflow-auto w-[90%]">
          {groups.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            
            return (
              <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`flex flex-col bg-blue4 p-3 rounded-md shadow-md w-full cursor-pointer ${
                selectedGroup?.id === group.id ? "bg-blue3" : ""
              }`}
              >
                <h2 className="text-lg font-bold">{group.name}</h2>
                <p className="text-sm text-gray-200">
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
            <div className="flex items-center justify-center w-full bg-blue4 rounded-md p-3">
              <h1 className="text-xl font-bold text-white">
                {selectedGroup.name}
              </h1>
            </div>

            <div className="flex flex-col bg-alice rounded-md w-[100%] p-4 h-[85%] overflow-y-auto">
              {selectedGroup.messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
                >
                  <div
                    className={`${
                      msg.sender === "user" ? "bg-blue1" : "bg-blue0"
                    } text-white p-3 rounded-lg max-w-[70%]`}
                    >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center w-[50%] mt-4 mb-5">
              <input
                type="text"
                className="flex-1 p-3 rounded-md border-2 border-blue5 mr-2"
                placeholder="Digite sua mensagem"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                />
              <button
                className="px-4 py-2 bg-blue5 text-white rounded-md"
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
