"use client"

import { useState } from "react";
import blueColor from "@/assets/blueColor.jpg";
import Image, { StaticImageData } from "next/image";
import { Answer } from "@/components/answer";

export default function Topic() {
  interface User {
    id: string;
    name: string;
    instructor: boolean;
    image: StaticImageData;
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
  }

  interface Topic {
    id: number;
    title: string;
    idSection: number;
    mainComment: {
      user: User;
      content: string;
    };
    comments: Comment[];
  }

  const [topic, setTopic] = useState<Topic>({
    id: 1,
    title: "Título do Tópico",
    idSection: 1,
    mainComment: {
      user: { id: "1", name: "Instrutor", instructor: true, image: blueColor }, 
      content: "Esta é a pergunta principal do tópico.",
    },
    comments: [
      {
        id: 1,
        content: "Esta é uma resposta de exemplo ao tópico principal.",
        user: { id: "2", name: "Usuário", instructor: false, image: blueColor },
        mention: null,
      },
    ],
  });

  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [newReply, setNewReply] = useState("");

  const handleAddAnswer = (content: string, mention: Mention | null) => {
    const newComment: Comment = {
      id: topic.comments.length + 1,
      content,
      user: { id: "2", name: "Usuário", instructor: false, image: blueColor }, 
      mention,
    };

    setTopic((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  return (
    <div className="h-screen">
      <div className="flex m-12 flex-col">
        <div className="flex flex-col items-center rounded-xl p-3 font-robFont mb-3 text-black">
          <div className="flex flex-col ml-10 min-w-[90%]">
            <h1 className="text-blue1 text-3xl mb-3 text-center">{topic.title}</h1>
            <h3 className="ml-1 text-center">{topic.mainComment.content}</h3>
            <div className="flex justify-end text-blue1">
              {topic.mainComment.user.name}
            </div>
          </div>
          <hr className="w-full border-t-1 border-black" />
        </div>

        <div className="flex flex-col border-blue5 border-2 rounded-md m-10">
          <textarea
            name="ans"
            id="ans"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none"
            placeholder="Digite sua resposta à pergunta principal"
          />
          <button
            className="bg-blue5 w-20 rounded-md p-2 ml-auto m-1"
            onClick={() => {
              handleAddAnswer(newReply, null);
              setNewReply("");
            }}
          >
            Enviar
          </button>
        </div>

        {topic.comments.map((comment) => (
          <div key={comment.id} className="mb-5">
            <Answer
              comment={comment}
              onReply={() => setReplyingTo(comment)}
            />
          </div>
        ))}

        {replyingTo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-2xl font-xl mb-4">
                Responder a {replyingTo.user.name}
              </h2>
              <textarea
                name="reply"
                className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none"
                placeholder={`Responda a: ${replyingTo.content}`}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="bg-blue5 w-20 rounded-md p-2"
                  onClick={() => {
                    handleAddAnswer(newReply, {
                      id: replyingTo.id,
                      username: replyingTo.user.name,
                      content: replyingTo.content,
                    });
                    setNewReply("");
                    setReplyingTo(null);
                  }}
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
}
