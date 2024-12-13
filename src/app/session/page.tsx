"use client"

import React, { useState } from "react";
import Topic from "@/components/topic"
import { Header } from "@/components/header";
import Image from "next/image";
import plus from "@/assets/icons8-adicionar-100.png";

interface getTopic {
  id: string;
  title: string;
  description: string;
}

interface UserSession {
  id: string;
  title: string;
  description: string;
  topics: getTopic[];
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

const forums: UserSession[] = [
  {
    id: "1",
    title: "Titulo da sessao",
    description: "Descrição da sessao",
    topics: [
      {
        id: "1",
        title: "Inteligência Artificial",
        description: "Impactos e tendências da IA no mercado.",
      },
      {
        id: "2",
        title: "Desenvolvimento Web",
        description: "Novas tecnologias e frameworks no desenvolvimento web.",
      },
    ],
  },
];

interface newTopico {
  title: string;
  mainQuestion: string;
}

const Session = () => {

  const u: user = { id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: 'xmarimarquesh', instructor: 1, isUser: true }

  const [usuario, setUsuario] = useState(u);

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newForum, setNewForum] = useState<UserSession[]>(forums);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newMainQuestion, setNewMainQuestion] = useState<string>("");

  const handleAddTopico = (forumId: string) => {
    if (newTitle && newMainQuestion) {
      const newTopic: getTopic = {
        id: (Math.random() * 10000).toFixed(0), // Gerar um ID único
        title: newTitle,
        description: newMainQuestion, // Ajuste para corresponder à interface `getTopic`
      };

      // Atualiza os tópicos no fórum correspondente
      setNewForum((prevForums) =>
        prevForums.map((forum) =>
          forum.id === forumId
            ? {
              ...forum,
              topics: [...forum.topics, newTopic],
            }
            : forum
        )
      );

      // Reseta os campos
      setModalAdd(false);
      setNewTitle("");
      setNewMainQuestion("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };



  const forum = newForum[0];
  return (
    <div className="flex flex-col border-black rounded-md mt-20">
      <Header />
      {modalAdd && (
        <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
          <div className="bg-white p-12 rounded-lg w-[600px] ">
            <form id="modal" className="">
              <h1 className="text-blue1 text-3xl">Adicionar Tópico á Sessão</h1>
              <input type="text" placeholder="Digite o título do tópico" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 " />
              <textarea placeholder="Digite o ponto de partida da discussão" value={newMainQuestion} onChange={(e) => setNewMainQuestion(e.target.value)} className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 " />
            </form>
            <div className="w-[100%] flex items-end justify-end mt-5">
              <button onClick={() => handleAddTopico(forum.id)} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800">Salvar</button>
              <button onClick={() => setModalAdd(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800">Fechar</button>
            </div>
          </div>
        </div>
      )}
      {/* <div className="m-10">
        <div className="flex flex-col justify-center items-center  w-full mt-5">
          <p className="text-blue1 text-3xl font-robCondensed">{forum.title}</p>
          <p className="text-blue3 text-lg">{forum.description}</p>
          <p className="text-md mt-5">Nome do instrutor</p>
        </div>
        <div className="flex items-end justify-end w-[100%]">
            { usuario.instructor == 1 ? (
                <div  className="w-auto cursor-pointer" onClick={() => setModalAdd(true)}>
                    <Image src={plus} width={50} height={50} alt="Adicionar Sessao" />
                </div>
            ) : (
                <>
                </>
            )}
        </div>
        {forum.topics.map((topic) => (
          <Topic key={topic.id} title={topic.title} description={topic.description}/>
        ))}
      </div> */}
      <div className="pr-20 pl-20 pt-10 flex flex-col items-center">
        <div className="flex flex-col flex-wrap w-[100%]">
          <h1 className={styles.h1}>{forum.title}</h1>
          <p className="font-robCondensed">{forum.description}</p>
          <p className="italic text-gray-500">Nome do instrutor</p>
        </div>
        <div className="flex items-end justify-end w-[100%]">
          {usuario.instructor == 1 ? (
            <div className="w-auto cursor-pointer" onClick={() => setModalAdd(true)}>
              <Image src={plus} width={50} height={50} alt="Adicionar Sessao" />
            </div>
          ) : (
            <>
            </>
          )}
        </div>
        <div className="w-full flex-col">
          {forum.topics.map((topic) => (
            <Topic key={topic.id} title={topic.title} description={topic.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  h1: "text-blue1 text-3xl font-robCondensed",
  box: "flex w-[100%] gap-4 items-end justify-end",
  search: "border-b-2 border-blue1 w-[100%] p-2 outline-none",
};

export default Session;
