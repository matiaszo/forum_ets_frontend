// TopicPage Component
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Answer } from "@/components/answer";
import { Header } from "@/components/header";

interface User {
  id: string;
  name: string;
  instructor: boolean;
  image: string;
}

interface Mention {
  id: number;
  username: string;
  content: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  mention: Mention | null;
  likes: number;
}

interface Topic {
  id: number;
  title: string;
  idSection: number;
  mainComment: {
    id: number;
    user: User;
    content: string;
    likes: number;
  };
  comments: Comment[];
}

const TopicPage = () => {
  const instructor = localStorage.getItem("instructor");
  const userId = localStorage.getItem("id");

  const [topic, setTopic] = useState<Topic | null>(null);
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const params = useParams();
  const id = parseInt(params.id as string || "0", 10);


  const fetchTopic = async (topicId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("Token não encontrado. Faça login novamente.");

    try {
      const response = await fetch(`http://localhost:8080/topic/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao buscar os dados do tópico.");

      const data: Topic = await response.json();
      setTopic(data);
    } catch (error) {
      console.error("Erro ao buscar dados do tópico:", error);
    }
  };

  const handlePostAnswer = async (content: string, mention: Mention | null) => {
    const token = localStorage.getItem("token");
    if (!token || !topic) return console.error("Token ou tópico não encontrado.");

    console.log("Mention " + mention)
  
    const body = JSON.stringify({
      content,
      mentionId: mention ? mention.id : topic.mainComment.id,
      userId,
      topicId: topic.id,
    });
  
    try {
      const response = await fetch("http://localhost:8080/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
  
      if (!response.ok) throw new Error("Erro ao enviar a resposta.");
  
      fetchTopic(topic.id);
      setReplyingTo(null);
      setNewReply("");
    } catch (error) {
      console.error("Erro ao postar a resposta:", error);
    }
  };
  

  const handleLike = async (commentId: number) => {
    // Recuperando o token do localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }
  
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID não encontrado.");
      return;
    }
  
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      console.error("User ID inválido.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/comment/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userIdInt, commentId }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar o like.");
      }
  
      if (topic) {
        fetchTopic(topic.id);
      }
    } catch (error) {
      console.error("Erro ao processar o like:", error);
    }
  };
  

  useEffect(() => {
    if (!isNaN(id)) fetchTopic(id);
  }, [id]);

  if (!topic) return <p>Carregando...</p>;

  return (
    <div className="h-screen mt-20">
      <Header instructor={instructor? true: false}/>
      <div className="flex m-10 flex-col">
        <div className="flex flex-col items-center rounded-xl p-3 m-10 text-black">
          <div className="flex flex-col mt-4min-w-[95%]">
            <h1 className="text-blue1 text-3xl mb-3 capitalize font-robCondensed">{topic.title}</h1>
            <h3 className="ml-1 text-start capitalize">{topic.mainComment.content}</h3>
            <div className="flex justify-end text-blue1 capitalize">{topic.mainComment.user.name}</div>
          </div>
          <hr className="w-full border-t-1 border-black" />
        </div>

        <div className="flex flex-col border-blue5 border-2 rounded-md m-10">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none"
            placeholder="Digite sua resposta à pergunta principal"
          />
          <button
            className="bg-blue5 w-20 rounded-md p-2 ml-auto m-1"
            onClick={() => handlePostAnswer(newReply, null)}
          >
            Enviar
          </button>
        </div>

        {topic.comments.map((comment) => (
          <Answer
            key={comment.id}
            comment={comment}
            onReply={() => setReplyingTo(comment)}
            addNewComment={handlePostAnswer}
            onLike={() => handleLike(comment.id)}
          />
        ))}

        {replyingTo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-2xl font-xl mb-4">
                Responder a {replyingTo.user.name}
              </h2>
              <textarea
                className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none"
                placeholder={`Responda a: ${replyingTo.content}`}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="bg-blue5 w-20 rounded-md p-2"
                  onClick={() =>
                    handlePostAnswer(newReply, {
                      id: replyingTo.id,
                      username: replyingTo.user.name,
                      content: replyingTo.content,
                    })
                  }
                >
                  Enviar
                </button>
                <button
                  className="bg-red-500 w-20 rounded-md p-2"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
