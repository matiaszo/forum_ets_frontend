"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Topic from "@/components/topic";
import { Header } from "@/components/header";
import plus from "@/assets/icons8-adicionar-100.png";
import { use } from "react";

interface GetTopic {
  id: number;
  title: string;
  mainComment: string;
}

interface UserSession {
  id: number;
  title: string;
  description: string;
  creator: string;
  image: string;
  topics: GetTopic[];
}

interface User {
  id: string;
  name: string;
  image: string;
  bio: string;
  gitUseraname: string | null;
  instructor: number;
  isUser: boolean;
}

const SessionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [sessionData, setSessionData] = useState<UserSession | null>(null);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newMainQuestion, setNewMainQuestion] = useState<string>("");

  // Desempacotando o valor de params
  const { id } = use(params);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/section/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da sessão.");
        }

        const data: UserSession = await response.json();
        setSessionData(data);
      } catch (error) {
        console.error("Erro ao buscar dados da sessão:", error);
      }
    };

    fetchSessionData();

    const loggedUser = {
      id: "1",
      name: "Mariana",
      bio: "slaaa",
      image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg",
      gitUseraname: "xmarimarquesh",
      instructor: 1,
      isUser: true,
    };
    setUsuario(loggedUser);

  }, [id]);

  const handleAddTopico = () => {
    if (newTitle && newMainQuestion && sessionData) {
      const newTopic: GetTopic = {
        id: Math.floor(Math.random() * 10000),
        title: newTitle,
        mainComment: newMainQuestion,
      };

      setSessionData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            topics: [...prevData.topics, newTopic],
          };
        }
        return prevData;
      });

      // Reseta os campos
      setModalAdd(false);
      setNewTitle("");
      setNewMainQuestion("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (!sessionData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col border-black rounded-md mt-20 font-robFont">
      <Header />
      {modalAdd && (
        <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
          <div className="bg-white p-12 rounded-lg w-[600px] ">
            <form id="modal">
              <h1 className="text-blue1 text-3xl">Adicionar Tópico à Sessão</h1>
              <input
                type="text"
                placeholder="Digite o título do tópico"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "
              />
              <textarea
                placeholder="Digite o ponto de partida da discussão"
                value={newMainQuestion}
                onChange={(e) => setNewMainQuestion(e.target.value)}
                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "
              />
            </form>
            <div className="w-[100%] flex items-end justify-end mt-5">
              <button onClick={handleAddTopico} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800">Salvar</button>
              <button onClick={() => setModalAdd(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800">Fechar</button>
            </div>
          </div>
        </div>
      )}
      <div className="m-10">
        <div className="flex flex-col justify-center items-center w-full mt-5">
          <p className="text-blue1 text-3xl">{sessionData.title}</p>
          <p className="text-blue3 text-lg">{sessionData.description}</p>
          <p className="text-md mt-5">Nome do instrutor: {sessionData.creator}</p>
        </div>
        <div className="flex items-end justify-end w-[100%]">
          {usuario?.instructor === 1 && (
            <div className="w-auto cursor-pointer" onClick={() => setModalAdd(true)}>
              <Image src={plus} width={50} height={50} alt="Adicionar Sessão" />
            </div>
          )}
        </div>
        {sessionData.topics.map((topic) => (
          <Topic key={topic.id} title={topic.title} description={topic.mainComment} />
        ))}
      </div>
    </div>
  );
};

export default SessionPage;
