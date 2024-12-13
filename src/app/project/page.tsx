"use client";

import Card from "@/components/card";
// import dataUser from "@/constants/dataUserTests.json";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import ImageComponent from "@/components/image";
import { Header } from "@/components/header";
import Link from "next/link";
import axios from "axios";

// tipo de dado para os participantes
type Person = {
  id: number;
  name: string;
  image?: string;
};
// dados enviados dos projetos
type IProject = {
  id?: number,
  name: string;
  goals: string[];
  description: string;
  users: Person[];
  image?: string;
};

type IAllUsers = {
  id: number,
  name : string,
  image : string
}


const Projects = () => {

  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [openModalAddPeople, setOpenModalAddPeople] = useState<boolean>(false);

  // variáveis de estado para o projeto
  const [nameProject, setNameProject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [personValue, setPersonValue] = useState<string>("");
  const [goalValue, setGoalValue] = useState<string>("");

  const [dataUser, setDataUser] = useState<IAllUsers[]>([])

  const [project, setProject] = useState<IProject[]>([]);
  const [newImage, setNewImage] = useState<string>("");

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

  let token: string | null;

  useEffect(() => {
      
    // get para pegar os projetos
    token = localStorage.getItem('token')
    let idUser = localStorage.getItem('id')

    if (!token) {
      alert("Você precisa estar logado para acessar os projetos.");
      return;
    }
      const fetchProjects = async () => {
        try {
          const responseProject = await axios.get("http://localhost:8080/project", {
            headers: {
              // method : 'GET',
              Authorization: `Bearer ${token}`, 
            },
          });
  
          setProject(responseProject.data);

        } catch (err) {
            console.log(err)
        }
      };

      // pegar o usuário atual

      const currentUser = async () => {
        try {
          const responseUser = await axios.get(`http://localhost:8080/user/${idUser}`, {
            headers: {
              // method : 'GET',
              Authorization: `Bearer ${token}`, 
            },
          });
  
          addPeopleToList(responseUser.data)

        } catch (err) {
            console.log(err)
        }
      };

      const allusers = async () => {
        try {
          const responseUser = await axios.get(`http://localhost:8080/user`, {
            headers: {
              // method : 'GET',
              Authorization: `Bearer ${token}`, 
            },
          });
  
          setDataUser(responseUser.data)

        } catch (err) {
            console.log(err)
        }
      };
  
      // chama a função para buscar os dados
      fetchProjects();
      currentUser();
    }, []); // O array vazio [] faz com que o efeito seja executado apenas uma vez (quando o componente monta)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Por favor, selecione uma imagem.");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setNewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    

  // função para criar um projeto e salvar dados
  const setInfos = async () => {

    const newProject: IProject = {
        name: nameProject,
        goals: goals,
        description: description,
        users: listContributors,
        // image: newImage,
    };

    try {
        console.log(newProject)
        const response = await fetch('http://localhost:8080/project', {
          method: 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(newProject)
        })

        if(response.ok) {
          alert('criado com sucesso')
          setOpenModalAddPeople(false)
          console.log(response)
        } else {

          console.log("erro: ", response)
        }

    } catch (error) {
        console.log(error)
    }

    // adiciona o novo projeto à lista de projetos
    setInfoProject(newProject);

    setProject((prevProjects) => [...prevProjects, newProject]);

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

  const deleteGoal = (goalToRemove : string) => {
    setGoals((prevGoals) => prevGoals.filter(goal => goal !== goalToRemove));
  }

  function deletePerson(personToRemove: Person) {
        setListContributors((prevList) => prevList.filter(person => person !== personToRemove))
  }
 
  return (
    <div className="flex flex-col mt-20">
        <Header/>
        <div className="pr-20 pl-20 pt-10 w-[100%]">
            {/* Modal de criação do projeto */}
            {openModalInfo && (
                <div className={styles.modalContainer}>
                <form  id="modal" className={styles.modalBox}>
                    <h1 className={styles.title}>Crie um novo projeto</h1>
                    <div className="flex flex-col items-center space-y-4">
                        <input type="file" accept="image/*" capture="environment" id="cameraInput" onChange={handleImageChange} className="hidden"/>
                        <label htmlFor="cameraInput" className="cursor-pointer">
                        {newImage ? (
                            <img src={newImage} alt="Nova Imagem" className="w-96 h-64 object-cover rounded-lg"/>
                            ) : (
                                <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Adicione uma imagem</div>
                            )}
                        </label>
                    </div>
                    <div className={styles.content}>

                    <input
                        className={styles.input + 'capitalize'}
                        onChange={setNameOfProject}
                        value={nameProject}
                        type="text"
                        placeholder="Digite o nome de seu projeto"
                        required
                    />

                    <input
                        className={styles.input}
                        onChange={setDescriptionOfProject}
                        value={description}
                        type="text"
                        placeholder="Digite uma descrição para o seu projeto"
                        required
                    />

                    <div className="flex gap-10">
                        <input
                        className={styles.inputObj}
                        type="text"
                        value={goalValue} 
                        onChange={(e) => setGoalValue(e.target.value)} // atualiza o valor do objetivo
                        onKeyDown={handleGoalKeyDown} // chama addGoal quando pressionar Enter
                        placeholder="Adicione objetivos ao seu projeto"
                        required
                        />
                        <div className="self-center " onClick={addGoal}>
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

                    {goals.length > 0 && (
                    <div className="flex flex-col justify-items-stretch bg-gray-100 overflow-y-scroll max-h-[100px] rounded p-2 m-4 w-[79%] scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                        {goals.map((goal, index) => {
                        return (
                            <div key={index} className="flex items-center justify-between m-2">
                            <ImageComponent src="topic3.png" width={25} height={25} alt="topic" />
                            <h1 className="flex-wrap">{goal}</h1>
                            <div className="ml-auto" onClick={() => {deleteGoal(goal)}} >
                                <ImageComponent
                                className="cursor-pointer"
                                src="menos.png"
                                width={30}
                                height={30}
                                alt="topic"
                                />
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    )}


                    <div className="flex justify-end gap-3">
                    <button
                        className={styles.btnNext}
                        onClick={() => {
                        if((nameProject && description)) {

                            setOpenModalInfo(false);
                            setOpenModalAddPeople(true);
                            //   setInfos(); // Salva o projeto ao clicar
                        }
                        }}>
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
                <form id="modal" className={styles.modalNext}>
                    <h1 className={styles.title}>Adicione pessoas ao seu projeto</h1>
                    <div className={`${styles.content} mb-8`}>
                    <div className="flex gap-10">
                        <input
                        id="person"
                        className={styles.input}
                        onChange={setValuePerson}
                        type="text"
                        placeholder="Pesquise por participantes..."
                        value={personValue}
                        />
                    </div>

                    {/* exibição das pessoas encontradas */}
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
                            <p className="self-center ">{person.name}</p>
                            <div className="ml-auto" >
                                <ImageComponent
                                    src={"icons8-adicionar-100.png"}
                                    width={30}
                                    height={30}
                                    alt=""
                                    className={styles.iconAdd}
                                />
                            </div>
                            </div>
                        ))}
                    </div>

                    <p className="my-4 ">Abaixo irão aparecer as pessoas adicionadas</p>

                    {/* exibe as pessoas que foram selecionadas */}
                    {listContributors.length > 0 && (
                        <div className={styles.people}>
                        {listContributors.map((person) => (
                            <div key={person.id} className={styles.person}>
                            <ImageComponent
                                src={person.image? person.image : ''}
                                width={40}
                                height={40}
                                alt={person.name}
                                className={styles.imgProfile}
                            />
                            <p className="self-center">{person.name}</p>
                            <div className="ml-auto" onClick={() => {deletePerson(person)}} >
                                <ImageComponent
                                className="cursor-pointer"
                                src="menos.png"
                                width={30}
                                height={30}
                                alt="topic"
                                />
                            </div>
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
                        <div  className="w-auto" onClick={() => setOpenModalInfo(true)}>
                            <ImageComponent src={'icons8-adicionar-100.png'} width={50} height={50} alt="" className={styles.icon} />
                        </div>
                    </div>
            </div>

            {/* Cards view */}
    
                <div className={styles.container}>

                {project?.length === 0 ? (
                    <p className="text-slate-400" >Você ainda não tem projetos</p> 
                ) : (
                    project?.map((item, index) => (
                    <Link key={index} href={`/projectSelected?id=${item.id}`}>
                        <Card title={item.name} mainQuestion={item.description} image={item.image ? item.image : ''}/>
                    </Link>
                    ))
                )}
                </div>

            </div>
        </div>
  );
};

export default Projects;

const styles = {
  title: "text-blue1 text-3xl",
  input: " w-full p-2 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 ",
  inputObj: "capitalize w-[500px] p-2 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1",
  content: "m-4",
  header: "",
  container: "flex justify-center items-center flex-wrap m-10 mx-35 gap-8",
  icon: "cursor-pointer h-12 w-auto self-center",
  iconAdd: "cursor-pointer h-8 w-auto self-end",
  modalContainer:
    "h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]",
  modalBox:
    "bg-white w-[600px] p-4 w-auto flex-wrap rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]",
  modalNext:
    "bg-white w-[600px] p-4 rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] max-h-[90%]",
  btnNext: "bg-blue-500 text-white rounded-md px-3 py-3 hover:bg-blue-800",
  btnCancel: "bg-red-500 text-white rounded-md px-3 py-3 hover:bg-red-800",
  peopleSelect: "flex flex-col mt-2 overflow-y-scroll h-60 bg-gray-100 p-4 rounded ",
  people: "flex max-h-60 flex-col mt-2 overflow-y-scroll bg-gray-100 rounded",
  person: "flex gap-2 items-center cursor-pointer m-2",
  imgProfile: "object-cover rounded-full w-10 h-10 flex flex-row items-end justify-end",
};