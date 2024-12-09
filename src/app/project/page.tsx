"use client";

import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json";
import dataUser from "@/constants/dataUserTests.json";
import Image from "next/image";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import ImageComponent from "@/components/image";
import { Header } from "@/components/header";

// tipo de dado para os participantes
type Person = {
  id: number;
  name: string;
  image: string;
};
// dados enviados dos projetos
type IProject = {
  name: string;
  goals: string[];
  description: string;
  users: Person[];
};

const Projects = () => {
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [openModalAddPeople, setOpenModalAddPeople] = useState<boolean>(false);

  // variáveis de estado para o projeto
  const [nameProject, setNameProject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [personValue, setPersonValue] = useState<string>("");
  const [goalValue, setGoalValue] = useState<string>("");

 // listas que armazenam informaç~çoes inputadas
  const [goals, setGoals] = useState<string[]>([]);
  const [listContributors, setListContributors] = useState<Person[]>([]);

  // estado para armazenar o projeto criado
  const [infoProject, setInfoProject] = useState<IProject>();

  // atualiza o nome do projeto
  const setNameOfProject = (event: ChangeEvent<HTMLInputElement>) => {
    setNameProject(event.target.value);
  };

  // atualiza a descrição do projeto
  const setDescriptionOfProject = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  // função para pesquisar pessoas
  const setValuePerson = (event: ChangeEvent<HTMLInputElement>) => {
    setPersonValue(event.target.value);
  };

  // função para adicionar um objetivo quando clica no incone de mais
  const addGoal = () => {
    let goal = goalValue.trim(); 
    if (goal && !goals.includes(goal)) {
      setGoals((prevList) => [...prevList, goal]); // adiciona o objetivo ao array
      setGoalValue(""); // limpa o campo após adicionar para melhor ux
    }
  };

  // se apertar enter tbm adicionar objetivo
  const handleGoalKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addGoal();
    }
  };

  // função para adicionar uma pessoa à lista de participantes
  const addPeopleToList = (person: Person) => {
    if (!listContributors.find((p) => p.id === person.id)) {
      setListContributors((prevList) => [...prevList, person]); // Adiciona o participante
    }
  };

  // função para finalizar o projeto e salvar os dados
  const setInfos = () => {
    if (!nameProject || !description || listContributors.length === 0 || goals.length === 0) {
      alert("Preencha todos os campos do projeto.");
    }

    const newProject: IProject = {
      name: nameProject,
      goals: goals,
      description: description,
      users: listContributors,
    };

    // adiciona o novo projeto à lista de projetos
    setInfoProject(newProject);

    // reseta os campos para o próximo projeto
    setNameProject("");
    setDescription("");
    setGoals([]);
    setListContributors([]);
    setPersonValue("");
    setGoalValue("");

    // fecha o modal
    setOpenModalAddPeople(false)
  };

  console.log(infoProject)

  return (
    <>
      <Header />

      {/* Modal de criação do projeto */}
      {openModalInfo && (
        <div className={styles.modalContainer}>
          <form action={"POST"} id="modal" className={styles.modalBox}>
            <h1 className={styles.title}>Crie um novo projeto</h1>
            <div className={styles.content}>
              <p>Digite um nome para o seu projeto</p>

              <input
                className={styles.input}
                onChange={setNameOfProject}
                value={nameProject}
                type="text"
              />

              <p>Digite uma descrição para o seu projeto</p>

              <input
                className={styles.input}
                onChange={setDescriptionOfProject}
                value={description}
                type="text"
              />

              <p>Adicione os objetivos do seu projeto</p>
              <div className="flex gap-10">
                <input
                  className={styles.inputObj}
                  type="text"
                  value={goalValue} 
                  onChange={(e) => setGoalValue(e.target.value)} // atualiza o valor do objetivo
                  onKeyDown={handleGoalKeyDown} // chama addGoal quando pressionar Enter
                />
                <div onClick={addGoal}>
                  <ImageComponent
                    src={"icons8-adicionar-100.png"}
                    width={50}
                    height={50}
                    alt="Adicionar objetivo"
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <button
                className={styles.btnNext}
                onClick={() => {
                  setOpenModalInfo(false);
                  setOpenModalAddPeople(true);
                //   setInfos(); // Salva o projeto ao clicar
                }}
              >
                Próximo
              </button>
              <button
                className={styles.btnCancel}
                onClick={() => {
                  setOpenModalInfo(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal para adicionar pessoas ao projeto */}
      {openModalAddPeople && (
        <div className={styles.modalContainer}>
          <form action={"POST"} id="modal" className={styles.modalNext}>
            <h1 className={styles.title}>Adicione pessoas ao seu projeto</h1>
            <div className={`${styles.content} mb-8`}>
              <p>Busque por nome</p>
              <div className="flex gap-10">
                <input
                  id="person"
                  className={styles.inputObj}
                  onChange={setValuePerson}
                  type="text"
                  placeholder="ex: Eduardo Henrique Ribeiro"
                  value={personValue}
                />
              </div>

              {/* Exibição das pessoas encontradas */}
              <div className={styles.peopleSelect}>
                {dataUser
                  .filter((person) =>
                    person.name.toLowerCase().includes(personValue.toLowerCase())
                  )
                  .map((person) => (
                    <div
                      key={person.id}
                      className={styles.person}
                      onClick={() => addPeopleToList(person)}
                    >
                      <ImageComponent
                        src={person.image}
                        width={40}
                        height={40}
                        alt={person.name}
                        className={styles.imgProfile}
                      />
                      <p className="self-center">{person.name}</p>
                      <ImageComponent
                        src={"icons8-adicionar-100.png"}
                        width={30}
                        height={30}
                        alt=""
                        className={styles.iconAdd}
                      />
                    </div>
                  ))}
              </div>

              <p className="my-4">Abaixo irão aparecer as pessoas adicionadas</p>

              {/* Exibe as pessoas que foram selecionadas */}
              {listContributors.length > 0 && (
                <div className={styles.people}>
                  {listContributors.map((person) => (
                    <div key={person.id} className={styles.person}>
                      <ImageComponent
                        src={person.image}
                        width={40}
                        height={40}
                        alt={person.name}
                        className={styles.imgProfile}
                      />
                      <p className="self-center">{person.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3">
              <button
                className={styles.btnNext}
                onClick={() => {
                  setInfos(); // finaliza o projeto e salva
                }}
              >
                Finalizar
              </button>

              <button
                className={styles.btnCancel}
                onClick={() => {
                  setOpenModalAddPeople(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

    <div className={styles.header}>
        <h1 className={styles.title}>Seus projetos</h1>
        <p>Seus projetos aparecem aqui</p>

        {/* Add projects */}
        <div className="flex justify-end">
            <div className="w-auto" onClick={() => setOpenModalInfo(true)}>
                <ImageComponent src={'icons8-adicionar-100.png'} width={50} height={50} alt="" className={styles.icon} />
            </div>
        </div>
    </div>

    {/* Cards view */}
    <div className={styles.container}>
        {dataTests.map((item, index) => (
            <Card key={index} title={item.title} mainQuestion={item.description} image={item.image} />
        ))}
    </div>

    </>
  );
};

export default Projects;


const styles = {
  title: "text-blue1 text-3xl mt-4",
  input: "bg-gray-100 w-full p-4 my-4 border-b-4 border-blue3",
  inputObj: "bg-gray-100 w-[500px] p-4 my-4 border-b-4 border-blue3",
  content: "m-4",
  header: "m-10 mt-32",
  container: "flex justify-center items-center flex-wrap m-10 mx-35",
  icon: "cursor-pointer h-16 w-auto self-center",
  iconAdd: "cursor-pointer h-8 w-auto self-end",
  modalContainer:
    "h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]",
  modalBox:
    "bg-white w-[600px] p-4 w-auto flex-wrap rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]",
  modalNext:
    "bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[620px]",
  btnNext: "bg-blue3 p-2 text-white rounded px-6 py-4 hover:bg-blue2",
  btnCancel: "bg-red-700 p-2 text-white rounded px-6 py-4 hover:bg-red-800",
  peopleSelect: "flex flex-col mt-2 overflow-y-scroll h-40 bg-gray-100 p-4 rounded ",
  people: "flex h-16 flex-col mt-2 overflow-y-scroll bg-gray-100 rounded",
  person: "flex gap-2 items-center cursor-pointer m-2",
  imgProfile: "object-cover rounded-full w-10 h-10",
};

