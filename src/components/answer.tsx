import React, { useState } from "react";
import blueColor from "@/assets/blueColor.jpg";
import Image from "next/image";

interface Mention {
  id: number;
  username: string;
  content: string;
}

interface User {
  id: string;
  name: string;
  instructor: boolean;
  image: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  mention: Mention | null;
}

interface AnswerProps {
  comment: Comment;
  onReply: (content: string, mention: Mention | null) => void; // Função para adicionar resposta
}

export const Answer: React.FC<AnswerProps> = ({ comment, onReply }) => {
  const [answerContent, setAnswerContent] = useState<string>("");

  const handleReply = () => {
    if (answerContent.trim() !== "") {
      onReply(answerContent, comment.mention);
      setAnswerContent(""); // Limpar a textarea
    }
  };

  return (
    <div className="flex flex-col bg-blue5 rounded-md shadow-xl mb-3 m-10">
      <div className="flex items-center shadow-inner rounded-md p-3 text-black font-robFont mt-4 m-10 bg-alice">
        <div className="flex flex-col ml-5 min-w-[90%]">
          <div className="flex text-blue1 text-md mb-3">
            <Image className="h-[3%] w-[6px] rounded-full mt-2" src={blueColor} alt="blue" />
            <h1 className="ml-1">{comment.user.name}</h1>
          </div>
          <h3 className="ml-1 text-sm">{comment.content}</h3>
        </div>
      </div>
      {/* Exibe menção se houver */}
      {comment.mention && (
        <div className="ml-10 mt-2 text-sm text-gray-500">
          Resposta de @{comment.mention.username}: {comment.mention.content}
        </div>
      )}
      {/* Input de resposta */}
      <div className="flex flex-col border-blue5 border-2 rounded-md m-1">
        <textarea
          name="ans"
          id="ans"
          className="m-1 text-black placeholder-blue0 p-1 h-30 mb-1 focus:outline-none focus:border-none"
          placeholder="Digite aqui"
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
        />
        <button className="bg-blue5 w-20 rounded-md p-2 ml-auto m-1" onClick={handleReply}>
          Send
        </button>
      </div>
    </div>
  );
};
