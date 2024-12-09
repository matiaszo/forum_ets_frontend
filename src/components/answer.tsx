import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import blueColor from "@/assets/blueColor.jpg";

interface AnswerProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
}

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

export const Answer: React.FC<AnswerProps> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<Comment[]>([]); 

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return;

    const newComment: Comment = {
      id: Date.now(),
      content: replyContent,
      user: {
        id: "currentUserId",
        name: "Current User",
        instructor: false,
        image: blueColor,
      },
      mention: {
        id: comment.id,
        username: comment.user.name,
        content: comment.content,
      },
    };

    setReplies((prevReplies) => [...prevReplies, newComment]); 
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="flex flex-col bg-blue5 rounded-md shadow-xl mb-3 p-4">
      {comment.mention && (
        <div className="p-3 border-l-2 border-blue4 mb-3 bg-blue1/10 rounded-md">
          <p className="text-sm text-gray-600">Respondendo a: {comment.mention.username}</p>
          <p className="text-gray-800 italic">"{comment.mention.content}"</p>
        </div>
      )}

      <div className="flex items-center mb-2">
        <Image
          src={comment.user.image}
          alt={comment.user.name}
          className="h-8 w-8 rounded-full mr-3"
          width={32}
          height={32}
        />
        <p className="font-bold text-blue1">{comment.user.name}</p>
      </div>
      <p className="mt-1 text-black">{comment.content}</p>

      <button
        className="mt-3 text-alice underline text-sm bg-blue4"
        onClick={() => setIsReplying(true)}
      >
        Responder
      </button>

      {isReplying && (
        <div className="mt-3 border-t pt-3">
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue5"
            placeholder={`Responda a ${comment.user.name}`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
              onClick={() => setIsReplying(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-blue5 text-white px-4 py-2 rounded-md"
              onClick={handleReplySubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-3">
          {replies.map((reply) => (
            <div key={reply.id} className="flex flex-col bg-blue3 rounded-md shadow-xl mb-3 p-4">
              <div className="flex items-center mb-2">
                <Image
                  src={reply.user.image}
                  alt={reply.user.name}
                  className="h-8 w-8 rounded-full mr-3"
                  width={32}
                  height={32}
                />
                <p className="font-bold text-blue1">{reply.user.name}</p>
              </div>
              <p className="text-black">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
