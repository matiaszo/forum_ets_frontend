import React from "react";
import Topic from "@/components/topic"
import { Header } from "@/components/header";

interface Topic {
  id: string;
  title: string;
  description: string;
}

interface UserSession {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
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

const Session = () => {
  const forum = forums[0];
  return (
    <div className="flex flex-col border-black rounded-md mt-20 font-robFont">
      <Header/>
      <div className="m-10">
        <div className="flex flex-col justify-center items-center  w-full mt-5">
          <p className="text-blue1 text-3xl">{forum.title}</p>
          <p className="text-blue3 text-lg">{forum.description}</p>
          <p className="text-md mt-5">Nome do instrutor</p>
        </div>
        {forum.topics.map((topic) => (
          <Topic key={topic.id} title={topic.title} description={topic.description}/>
        ))}
      </div>
    </div>
  );
};

export default Session;
