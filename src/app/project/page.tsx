"use client";

import Card from "@/components/card";
// import dataUser from "@/constants/dataUserTests.json";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import ImageComponent from "@/components/image";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import mais from "@/assets/icons8-adicionar-100.png"
import menos from "@/assets/menos.png"
import topic3 from "@/assets/topic3.png"
import adicionar from "@/assets/icons8-adicionar-100.png"
import plusLight from '@/assets/plusClaro.png'

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

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
  users: number[];
  image?: string;
};

type IAllUsers = {
  id: number,
  name: string,
  image: string
}

interface user {
  id: string;
  name: string;
  image: string;
  bio: string;
  email: string;
  edv: string;
  gitUsername: string;
  instructor: number;
  isUser: boolean;
}

const Projects = () => {

  // variáveis para controlar os modais
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [openModalAddPeople, setOpenModalAddPeople] = useState<boolean>(false);

  // variáveis de estado para o projeto
  const [nameProject, setNameProject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [personValue, setPersonValue] = useState<string>("");
  const [goalValue, setGoalValue] = useState<string>("");
  const [project, setProject] = useState<IProject[]>([]);
  const [newImage, setNewImage] = useState<string>("");

  // variável que contém todos os usuários
  const [dataUser, setDataUser] = useState<IAllUsers[]>([])

  // listas que armazenam informaçoes inputadas
  const [goals, setGoals] = useState<string[]>([]);
  const [listContributors, setListContributors] = useState<Person[]>([]);
  const [listIdContributors, setIdListContributors] = useState<number[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const [usuario, setUsuario] = useState<user>({
    id: '',
    name: '',
    image: '',
    bio: '',
    gitUsername: '',
    email: '',
    edv: '',
    instructor: 0,
    isUser: false,
  });

  // estado para armazenar o projeto criado localmente
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
      console.log(`Adicionando pessoa: ${person.name}`);
      setListContributors((prevList) => [...prevList, person]); // Adiciona o participante com todas as informações
      setIdListContributors((prev) => [...prev, person.id]) // adicoina apenas com id para enviar à requisão
    }
  };

  let tokenToGet: string | null;

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

useEffect(() => {
  let user = localStorage.getItem("user");
  if (user != null) {
    setUsuario(JSON.parse(user));
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setIsDarkMode(true);
    document.documentElement.classList.add("dark"); 
  } else {
    setIsDarkMode(false);
    document.documentElement.classList.remove("dark");
  }

  // Get token and user ID from localStorage
  const tokenToGet = localStorage.getItem('token');
  const idUser = localStorage.getItem('id');

  // Handle user ID
  if (idUser !== null) {
    const parsedId = parseInt(idUser, 10);
    if (!isNaN(parsedId)) {
      setIdListContributors(prevList => [...prevList, parsedId]);
    } else {
      console.error('ID inválido no localStorage');
    }
  }

  // Fetch projects and users
  const fetchProjects = async () => {
    try {
      const responseProject = await axios.get("http://localhost:8080/project", {
        headers: {
          Authorization: `Bearer ${tokenToGet}`,
        },
      });

      setProject(responseProject.data); // Set the project data
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${tokenToGet}`,
        },
      });
      setDataUser(response.data); // Set the users data
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Trigger fetch calls if token is available
  if (tokenToGet) {
    fetchUsers();
    fetchProjects();
  } else {
    alert("Você precisa estar logado para acessar os projetos.");
    return;
  }

}, []); // Empty dependency array ensures this runs only once when the component mounts

// Add a useEffect to handle when projects are fetched and logged
useEffect(() => {
  // if (project.length > 0) {
  //   console.log("Fetched Projects:", project);
  // }
}, [project]); // This will log the projects when the 'project' state changes


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
      users: listIdContributors,
      image: newImage, // Se for necessário enviar a imagem, descomente isso
    };

    const tokenToPost = localStorage.getItem('token')

    try {
      console.log("Enviando projeto:", newProject);
      console.log(tokenToPost)
      const response = await fetch('http://localhost:8080/project', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${tokenToPost}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject)
      });

      console.log(newProject);
      

      if (response.ok) {
        const projectData = await response.json(); // receber o projeto criado

        alert('Projeto criado com sucesso!');
        console.log("Projeto criado:", projectData);

        // atualiza a lista de projetos localmente 
        setProject((prevProjects) => [...prevProjects, projectData]);

        // resetar os campos para o próximo projeto
        resetProjectForm();

      } else {
        console.log("Erro ao criar o projeto:", response);
        alert("Erro ao criar o projeto. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no envio de dados:", error);
      alert("Erro ao enviar os dados. Tente novamente.");
    }
  };

  const handleUploadComplete = (result: any) => {
    if (result?.info?.public_id) {
      const publicId = result.info.public_id;
      console.log('Uploaded file public_id:', publicId);
      setNewImage(publicId); 
    } else {
      console.error('Upload failed or public_id is not present in the result');
    }
  };

  // Função para resetar os campos do formulário
  const resetProjectForm = () => {
    setNameProject("");
    setDescription("");
    setGoals([]);
    setListContributors([]);
    setIdListContributors([]);
    setPersonValue("");
    setGoalValue("");
  };

  const deleteGoal = (goalToRemove: string) => {
    setGoals((prevGoals) => prevGoals.filter(goal => goal !== goalToRemove));
  }

  function deletePerson(personToRemove: Person) {
    setListContributors((prevList) => prevList.filter(person => person !== personToRemove))
    setListContributors((prev) => prev.filter(person => person.id !== personToRemove.id))
  }

  return (
    <div className="flex flex-col mt-20">
      <Header toggleTheme={toggleTheme} instructor={usuario.instructor ? true : false} />
      <div className="pr-20 pl-20 pt-10 w-[100%]">
        {/* Modal de criação do projeto */}
        {openModalInfo && (
          <div className={styles.modalContainer}>
            <form id="modal" className={styles.modalBox}>
              <h1 className={styles.title}>Crie um novo projeto</h1>
              <div className="flex flex-col items-center space-y-4">
                {
                  newImage ? 
                  <CldImage
                  src={newImage || "segsnhic8wvgxhmcmj5w"} // Provide a fallback image if image is null
                  alt={usuario.name}
                  width={90}
                  height={90}
                  radius={40}
                  crop={{
                    type: 'auto',
                    source: true,
                  }}
                /> : ""
                }

                <CldUploadWidget
                  uploadPreset={cloudPresetName}
                  onSuccess={handleUploadComplete}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-96 h-12 mt-5 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                    >
                      Upload an Image
                    </button>
                  )}
                </CldUploadWidget>
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
                    <Image
                      src={isDarkMode? plusLight : adicionar}
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
                        <Image src={topic3} width={25} height={25} alt="topic" />
                        <h1 className="flex-wrap">{goal}</h1>
                        <div className="ml-auto" onClick={() => { deleteGoal(goal) }} >
                          <Image
                            className="cursor-pointer"
                            src={menos}
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
                    if ((nameProject && description)) {

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
                    .filter((person) => {
                      const matches = person.name.toLowerCase().includes(personValue.toLowerCase());
                      console.log(`Pesquisando por: ${personValue}, Encontrado: ${matches} para ${person.name}`);
                      return matches;
                    })
                    .map((person) => (
                      <div
                        key={person.id}
                        className={styles.person}
                        onClick={() => addPeopleToList(person)}
                      >
                        <CldImage
                          src={person.image ? person.image : "xjlzp7la2pcpac629a85"}
                          width={40}
                          height={40}
                          alt={person.name}
                          className={styles.ImageProfile}
                        />
                        <p className="self-center">{person.name}</p>
                        <div className="ml-auto">
                          <Image
                            src={adicionar}
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
                        <CldImage
                          src={person.image ? person.image : 'xjlzp7la2pcpac629a85'}
                          width={40}
                          height={40}
                          alt={person.name}
                          className={styles.ImageProfile}
                        />
                        <p className="self-center">{person.name}</p>
                        <div className="ml-auto" onClick={() => { deletePerson(person) }} >
                          <Image
                            className="cursor-pointer"
                            src={menos}
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
          <p className="dark:text-white" >Colabore com seus colegas em grupos exclusivos sobre projetos</p>

          {/* Add projects */}
          <div className="flex justify-end">
            <div className="w-auto" onClick={() => setOpenModalInfo(true)}>
              <Image src={mais} width={50} height={50} alt="" className={styles.icon} />
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
                <Card title={item.name} mainQuestion={item.description} image={item.image ? item.image : "xjlzp7la2pcpac629a85" } />
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
  title: "text-blue1 dark:text-blue5 text-3xl font-robCondensed",
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
  ImageProfile: "object-cover rounded-full w-10 h-10 flex flex-row items-end justify-end",
};
