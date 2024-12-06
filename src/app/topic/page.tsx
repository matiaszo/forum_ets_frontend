"use client"

import { useState } from "react";
import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";
import { Answer } from "@/components/answer";

export default function Topic() {
  const style = {
    image: "h-[4%] w-[10px] rounded-full mt-3"
  };

  const [topic, setTopic] = useState({
    id: 1,
    title: "Pergunta sobre programação",
    idSection: 1,
    mainComment: {
      user: {
        id: "user1",
        name: "João",
        instructor: true,
        image: blueColor,
      },
      content: "Qual é a melhor linguagem para desenvolvimento web?",
    },
    comments: [
      {
        id: 1,
        content: "Eu prefiro JavaScript!",
        user: {
          id: "user2",
          name: "Maria",
          instructor: false,
          image: "blueColor",
        },
        mention: null,
      },
    ],
  });

  const [newAnswer, setNewAnswer] = useState(""); 
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const handleAddAnswer = (content: string, mention: Mention | null) => {
    const newComment: Comment = {
      id: topic.comments.length + 1,
      content: content,
      user: {
        id: "user3",
        name: "Carlos",
        instructor: false,
        image: "blueColor",
      },
      mention: mention, 
    };

    setTopic({
      ...topic,
      comments: [...topic.comments, newComment], // Adiciona a nova resposta
    });

    setNewAnswer(""); // Limpa o campo de resposta
    setReplyingTo(null); // Limpa a resposta
  };

  return (
    <div className="h-screen">
      <div className="flex m-12 flex-col">
        <h1 className="text-blue1 text-3xl mb-3">{topic.title}</h1>

        <div className="flex flex-col items-center rounded-xl p-3 font-robFont mb-3 text-black">
          <div className="flex flex-col ml-10 min-w-[90%]">
            <h3 className="ml-1">{topic.mainComment.content}</h3>
            <div className="flex justify-end text-blue1">
              {topic.mainComment.user.name}
            </div>
          </div>
          <hr className="w-full border-t-1 border-black" />
        </div>

        {/* Exibe o componente Answer para responder à pergunta principal */}
        <Answer comment={{...topic.mainComment, mention: null}} onReply={handleAddAnswer} />

        {/* Exibe os comentários e o componente Answer para responder a comentários específicos */}
        {topic.comments.map((comment) => (
          <div key={comment.id}>
            <Answer comment={comment} onReply={handleAddAnswer} />
            <button
              className="text-blue5 ml-10 mt-3"
              onClick={() => setReplyingTo(comment)}
            >
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
