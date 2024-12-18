"use client";

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
  idSection: number;
}

interface UserSession {
  id: number;
  title: string;
  image: string;
  description: string;
  creator: string;
  topics: GetTopic[];
}

interface User {
  id: string;
  name: string;
  image: string;
  bio: string;
  gitUsername: string;
  instructor: number;
  isUser: boolean;
}

const SessionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const instructor = localStorage.getItem("instructor");
  const userId = localStorage.getItem("id");

  const [sessionData, setSessionData] = useState<any | null>(null);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newMainQuestion, setNewMainQuestion] = useState<string>("");
  const { id } = use(params);

  const handleGetSingleSession = async (sessionId: string) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }

      const response = await fetch(`http://localhost:8080/section/${sessionId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da sessão.");
      }

      const data: any = await response.json();
      console.log("Data:" + JSON.stringify(data))
      setSessionData(data);
    } catch (error) {
      console.error("Erro ao buscar dados da sessão:", error);
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if(user != null)
    {
        setUsuario(JSON.parse(user))
    }
  
    if (id) {
      handleGetSingleSession(id);
      console.log("deu fetch")
    }

  }, [id]);


  const handlePostTopic = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }
  
    if (!newTitle || !newMainQuestion) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;
      console.log("Usuário logado ID:", userId);
  
      const newTopicData = {
        title: newTitle,
        mainComment: newMainQuestion,
        idSection: id, 
      };
  
      const response = await fetch("http://localhost:8080/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTopicData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar o tópico. Tente novamente.");
      }
  
      const createdTopic = await response.json();
      console.log("Tópico criado com sucesso:", createdTopic);
  
      await handleGetSingleSession(id);
  
      setModalAdd(false);
      setNewTitle("");
      setNewMainQuestion("");
    } catch (error) {
      console.error("Erro ao criar o tópico:", error);
      alert("Erro ao criar o tópico. Tente novamente.");
    }
  };
  
  
  
  if (!sessionData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col border-black rounded-md mt-20 font-robCondensed">
      <Header instructor={localStorage.getItem('instructor') == '1' ? true : false} />
      {modalAdd && (
        <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
          <div className="bg-white p-12 rounded-lg w-[600px] max-h-[80%] overflow-y-auto">
            <form id="modal">
              <h1 className="text-blue1 text-3xl">Adicionar Tópico à Sessão</h1>
              <input
                type="text"
                placeholder="Digite o título do tópico"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1"
              />
              <textarea
                placeholder="Digite o ponto de partida da discussão"
                value={newMainQuestion}
                onChange={(e) => setNewMainQuestion(e.target.value)}
                className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1"
              />
            </form>
            <div className="w-[100%] flex items-end justify-end mt-5">
              <button
                onClick={handlePostTopic}
                className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800"
              >
                Salvar
              </button>
              <button
                onClick={() => setModalAdd(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="m-10">
        <div className="flex flex-col justify-center items-center w-full mt-5">
          <p className="text-blue1 text-3xl">{sessionData.section?.title || "Título indisponível"}</p>
          <p className="text-blue3 text-lg">{sessionData.section?.description || "Descrição indisponível"}</p>
          <p className="text-md text-end self-end mt-5 text-slate-500">{sessionData.section?.creator || "Desconhecido"}</p>
        </div>
        <div className="flex items-end justify-end w-[100%]">
          <div className="w-auto cursor-pointer" onClick={() => setModalAdd(true)}>
            <Image style={{margin: 10}} src={plus} width={50} height={50} alt="Adicionar Sessão" />
          </div>
        </div>
        {sessionData.topics && sessionData.topics.length > 0 ? (
          sessionData.topics.map((topic: any, index: number) => (
            <Topic key={topic.id || index} id={topic.id} title={topic.title} description={topic.mainComment} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-5">Nenhum tópico disponível.</p>
        )}
      </div>

    </div>
  );
};

export default SessionPage;
