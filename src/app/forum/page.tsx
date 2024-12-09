import React from "react";
import Topic from "@/components/topic"

interface Topic {
  id: string;
  title: string;
  description: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

const forums: Session[] = [
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

const Forum = () => {
  const forum = forums[0];
  return (
    <div className="flex flex-col border-black rounded-md m-8 font-robFont">
      <div className="flex flex-col justify-center items-center  w-full mt-5">
        <p className="text-blue1 text-3xl">{forum.title}</p>
        <p className="text-blue4 text-md">{forum.description}</p>
      </div>
      <p className="text-lg">Nome do instrutor</p>
      {forum.topics.map((topic) => (
        <Topic key={topic.id} title={topic.title} description={topic.description}/>
      ))}
    </div>
  );
};

export default Forum;
