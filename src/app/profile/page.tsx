"use client"
import { Header } from "@/components/header";
import { HeaderProfile } from "@/components/headerProfile";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilePhoto from "@/assets/Koala.jpg";
import editPhoto from "@/assets/edit.png";
import { Modal } from "@/components/Modal";
import { InicioProfile } from "@/components/inicioProfile";
import { FeedbackProfile } from "@/components/feedbackProfile";
import { InteracaoProfile } from "@/components/interacaoProfile";
import plus from "@/assets/icons8-adicionar-100.png";
import trash from "@/assets/trash-bin.png";
import defaultPhoto from "@/assets/blueColor.jpg"
import { CldImage, CldUploadWidget } from "next-cloudinary";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;


interface skillInterface {
    id: string;
    name: string;
    image: string;
}

interface areaOfInterest {
    id: string;
    name: string;
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

interface feedback {
    id: string;
    stars: number,
    text: string,
    public: boolean,
    projectName: string,
    user: {
        id: string,
        image: string,
        name: string,
        isUser: boolean,
    }
}

interface interacao {
    id: string,
    type: string,
    timestamp: Date,
    content: {
        text: string | null,
        username: string | null,
        title: string | null,
        public: boolean | null,
    }
}

export default function Home() {
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

    const [areas, setAreas] = useState<areaOfInterest[]>([]);
    const [skills, setSkills] = useState<skillInterface[]>([]);
    const [skillsDisponiveis, setSkillsDisponiveis] = useState<skillInterface[]>([]);

    const getUserData = async (token: string | null, id: string | null) => {

        if (!id) { return; }

        const response = await fetch(`http://localhost:8080/profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const dataUser = await response.json();

        console.log("DATAUSER:", dataUser);

        const mapUserData = (data: typeof dataUser): user => {
            return {
                id: String(data.id),
                name: data.name,
                image: data.image,
                bio: data.bio,
                email: data.email,
                edv: data.edv,
                gitUsername: data.gitUserName != null ? data.gitUserName : null,
                instructor: data.instructor ? 1 : 0,
                isUser: data.isUser,
            };
        };


        const mapSkills = (skills: typeof dataUser.skills): skillInterface[] => {
            return skills.map((skill: skillInterface) => ({
                id: String(skill.id),
                name: skill.name,
                image: skill.image,
            }));
        };

        const mapInterests = (interests: typeof dataUser.interests): areaOfInterest[] => {
            return interests.map((interest: areaOfInterest) => ({
                id: String(interest.id),
                name: interest.name,
            }));
        };

        const userData = mapUserData(dataUser);

        console.log("USERDATA:", userData);

        const skillData = mapSkills(dataUser.skills);
        const interests = mapInterests(dataUser.interests);

        console.log('USER:', userData);
        console.log('SKILL:', skillData);
        console.log('INTEREST:', interests);

        setUsuario(userData);
        setAreas(interests);
        setSkills(skillData);

        setNameTemp(userData?.name || '');
        setBioTemp(userData?.bio || '');
        setGithubTemp(userData?.gitUsername || '');
        setEmailTemp(userData?.email || '');


        const responseSkill = await fetch(`http://localhost:8080/skills`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!responseSkill.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const allSkills = await responseSkill.json();

        const mapSkillsDisponiveis = (skills: typeof allSkills) => skills.map((skill: skillInterface) => ({
            id: String(skill.id),
            name: skill.name,
            image: skill.image,
        }));

        console.log(allSkills)

        setSkillsDisponiveis(mapSkillsDisponiveis(allSkills));
    };

    const [retorno, setRetorno] = useState<{ token: string | null; id: string | null }>({
        token: null,
        id: null,
    });

    useEffect(() => {

        const token = localStorage.getItem("token");
        const id = localStorage.getItem("profile");
        setRetorno({ token, id });

        console.log("id:", id);
        console.log("token:", token);

        getUserData(token, id);

    }, [])


    const [activeTab, setActiveTab] = useState('inicio');
    const [theme, setTheme] = useState('dark');

    // RESOLVENDO MODAL

    const [nameTemp, setNameTemp] = useState('');
    const [githubTemp, setGithubTemp] = useState('');
    const [bioTemp, setBioTemp] = useState('');
    const [emailTemp, setEmailTemp] = useState('');
    const [imageTemp, setImageTemp] = useState('');

    const [newArea, setNewArea] = useState("");
    const [newSkillId, setNewSkillId] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- MODAL

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModalAndSave = async () => {
        try {
            const dataToSend = {
                bio: bioTemp.trim() != usuario.bio ? bioTemp : null,
                name: nameTemp.trim() != usuario.name ? nameTemp : null,
                email: emailTemp.trim() != usuario.email ? emailTemp : null,
                image: imageTemp != usuario.image ? imageTemp : null,
                gitUsername: githubTemp.trim() != usuario.gitUsername ? githubTemp : null,
            };

            console.log(dataToSend);

            const response = await fetch(`http://localhost:8080/profile/${retorno.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${retorno.token}`
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar os dados response");
            }

            const result = await response.text();
            console.log("Dados salvos com sucesso:", result);

            closeModal();

            location.reload();
        } catch (err) {
            console.error("Erro ao salvar os dados:", err);
        }
    };


    const handleAddArea = async () => {
        if (newArea.trim() !== "") {
            try {
                const response = await fetch(`http://localhost:8080/profile/interest/${retorno.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${retorno.token}`
                    },
                    body: JSON.stringify({ name: newArea.trim() }),
                });

                if (!response.ok) {
                    throw new Error("Erro ao salvar a área");
                }

                const newAreaData = await response.json();

                setAreas([...areas, { id: newAreaData.id, name: newAreaData.name }]);
                setNewArea("");
            } catch (error) {
                console.error("Erro ao adicionar área:", error);
            }
        }
    };


    const handleRemoveArea = async (id: string) => {
        try {
            const removeAreaData = {
                id: Number(id),
            };

            const response = await fetch(`http://localhost:8080/profile/interest/${retorno.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${retorno.token}`
                },
                body: JSON.stringify(removeAreaData),
            });

            if (!response.ok) {
                throw new Error("Erro ao remover a área");
            }

            setAreas(areas.filter((area) => area.id !== id));
        } catch (error) {
            console.error("Erro ao remover a área:", error);
        }
    };


    const handleAddSkill = async () => {
        console.log("ADICIONANDO SKILL");

        if (newSkillId.trim() !== "") {
            const exists = skills.some((skill) => skill.id === newSkillId.trim());
            if (!exists) {
                const newSkillData = {
                    skill: Number(newSkillId.trim()),
                };

                try {

                    const response = await fetch(`http://localhost:8080/profile/skill/${retorno.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${retorno.token}`
                        },
                        body: JSON.stringify(newSkillData),
                    });

                    console.log(response);

                    if (response.ok) {
                        const responseData = await response.json();
                        console.log("Skill adicionada com sucesso:", responseData);

                        setSkills(prevSkills => [...prevSkills, responseData]);

                    } else {
                        console.error("Erro ao adicionar skill:", response.statusText);
                        alert("Erro ao adicionar a skill!");
                    }
                } catch (error) {
                    console.error("Erro ao fazer a requisição:", error);
                    alert("Erro ao conectar com o servidor!");
                }
            } else {
                alert("Skill já adicionada!");
            }
        }
    };


    const handleRemoveSkill = async (id: string) => {
        try {
            const newSkillData = {
                skill: Number(id.trim()),
            };

            const response = await fetch(`http://localhost:8080/profile/skill/${retorno.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${retorno.token}`
                },
                body: JSON.stringify(newSkillData),
            });

            if (response.ok) {
                console.log("Skill removida com sucesso!");
                setSkills(skills.filter((skill) => skill.id !== id));
            } else {
                console.error("Erro ao remover skill:", response.statusText);
                alert("Erro ao remover a skill!");
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            alert("Erro ao conectar com o servidor!");
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'inicio':
                return (
                    <InicioProfile usuario={usuario} skills={skills} />
                )
            case 'feedback':
                return (
                    <FeedbackProfile isUser={usuario.isUser} />
                );
            case 'interacoes':
                return (
                    <InteracaoProfile />
                );
            default:
                return null;
        }
    };


    const handleUploadComplete = (result: any) => {
        if (result?.info?.public_id) {
            const publicId = result.info.public_id;
            console.log('Uploaded file public_id:', publicId);
            setImageTemp(publicId);
        } else {
            console.error('Upload failed or public_id is not present in the result');
        }
    };

    // IMAGEMMMM

    const [image, setImage] = useState(usuario.image);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUsuario((prevUsuario) => ({
                    ...prevUsuario,
                    image: reader.result as string,
                }));
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="w-[100%] mt-7">
            <Header instructor={localStorage.getItem('instructor') == '1' ? true : false} />
            <div className="w-[100%] flex flex-row p-10 gap-10">
                <div className="w-[30%] min-h-[80%] shadow-lg flex-col rounded-lg flex items-center p-12 justify-between">
                    <div className="flex flex-col items-center w-[100%]">
                        <CldImage
                            src={usuario.image || "xjlzp7la2pcpac629a85"} // Provide a fallback image if image is null
                            alt={usuario.name}
                            width={150}
                            height={150}
                            radius={150}
                            crop={{
                                type: 'auto',
                                source: true,
                            }}
                        />
                        <h1 className="text-[26px] font-robCondensed text-blue1 mt-2 capitalize font-medium" >{usuario.name}</h1>
                        <h1 className="text-[18px] font-robFont" >{usuario.instructor == 1 ? 'Instructor' : 'Aprendice'}</h1>
                        {usuario.bio ? (
                            <div className="shadow-md p-4 rounded-lg w-[100%] mt-1">
                                <h1 className="text-[20px] font-robCondensed text-blue1 mb-2 flex flex-col">About me</h1>
                                <h1 className="font-robFont ml-3">{usuario.bio}</h1>
                            </div>
                        ) : (
                            <>
                            </>
                        )}

                        {areas && areas.length > 0 ? (
                            <div className="shadow-md rounded-lg p-5 mt-5 w-[100%]">
                                <h1 className="text-[20px] font-robCondensed text-blue1 mb-2 flex flex-col">Areas of interest</h1>
                                {areas.map(area => (
                                    <div key={area.id}>
                                        <li className="font-robFont ml-3 marker:text-blue2">{area.name}</li>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}

                    </div>
                    <div className="w-[100%] justify-end flex mb-10 mt-2">
                        {usuario.isUser ? (
                            <button onClick={openModal} >
                                <Image src={editPhoto} alt="edit" className="cursor-pointer" />
                            </button>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-[70%] shadow-lg rounded-lg min-h-[80%] p-5 ">
                    <HeaderProfile activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="pt-2 ">
                        {renderTabContent()}
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal} className="m-0">
                    <div className="max-h-[90vh] overflow-y-auto flex flex-col w-[100%] items-center scrollbar scrollbar-thumb-blue5 scrollbar-track-gray-100 gap-2 p-2">
                        <h1 className="text-[32px] mt-5 font-robFont ">Editar Perfil</h1>
                        <div className="flex flex-col items-center space-y-4">
                        <CldImage
                            src={imageTemp ? imageTemp : usuario.image || "xjlzp7la2pcpac629a85"} // Provide a fallback image if image is null
                            alt={usuario.name}
                            width={130}
                            height={130}
                            radius={130}
                            crop={{
                                type: 'auto',
                                source: true,
                            }}
                        />
                            <CldUploadWidget
                                uploadPreset={cloudPresetName}
                                onSuccess={handleUploadComplete}
                            >
                                {({ open }) => (
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="w-96 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                                    >
                                        Upload an Image
                                    </button>
                                )}
                            </CldUploadWidget>
                            {/* <label htmlFor="cameraInput" className="cursor-pointer">
                                {image ? (
                                    <img src={image} alt="Foto de Perfil" className="w-32 h-32 object-cover rounded-full" />
                                ) : (
                                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        Sem Foto
                                    </div>
                                )}
                            </label> */}
                        </div>

                        <label htmlFor="name" className="mt-3 text-[18px] w-[100%]">Nome</label>
                        <input type="text" value={nameTemp} onChange={(e) => setNameTemp(e.target.value)} className="w-[100%] border-b border-blue3 outline-none p-2" placeholder="Seu nome..." required />
                        <label htmlFor="email" className="mt-3 text-[18px] w-[100%]">Email</label>
                        <input type="text" value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} className="w-[100%] border-b border-blue3 outline-none p-2" placeholder="Seu email..." required />
                        <label htmlFor="name" className="mt-3 text-[18px] w-[100%]">GitHub Username</label>
                        <input type="text" value={githubTemp} onChange={(e) => setGithubTemp(e.target.value)} className="w-[100%] border-b border-blue3 outline-none p-2" placeholder="Seu username do github..." />
                        <label htmlFor="bio" className="mt-3 text-[18px] w-[100%]">Biografia</label>
                        <textarea value={bioTemp} onChange={(e) => setBioTemp(e.target.value)} className="w-[100%] min-h-24 rounded-sm border border-blue3 outline-none p-2" placeholder="Sua biografia..." />
                        <label htmlFor="areas" className="mt-3 text-[18px] w-[100%]">Áreas de Interesse</label>
                        <div className="w-[100%]">
                            <div className="max-h-32 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                                {areas.map((area) => (
                                    <div key={area.id} className="flex items-center mb-2">
                                        <h2 className="w-[80%] border-b border-blue3 outline-none p-2">{area.name}</h2>
                                        <button onClick={() => handleRemoveArea(area.id)} className="ml-2 text-red-500"><Image src={trash} width={24} height={24} alt="" /></button>
                                    </div>
                                ))}
                            </div>
                            <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)} className="w-[90%] border-b-2 border-blue3 outline-none p-2 mt-2" placeholder="Adicionar nova área" />
                            <button onClick={handleAddArea} className="px-4 py-2" ><Image src={plus} width={30} height={30} alt="Image" /></button>
                        </div>
                        <label htmlFor="areas" className="mt-3 text-[18px] w-[100%]">Skills</label>
                        <div className="w-[100%]">
                            <div className="max-h-32 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-blue3 scrollbar-track-gray-100">
                                {skills.map((sk, i) => (
                                    <div key={sk.id || i} className="flex items-center mb-2">
                                        <h2 className="w-[80%] border-b border-blue3 outline-none p-2">{sk.name}</h2>
                                        <button onClick={() => handleRemoveSkill(sk.id)} className="ml-2 text-red-500"><Image src={trash} width={24} height={24} alt="" /></button>
                                    </div>
                                ))}
                            </div>
                            <select name="skills" id="skills" className="w-[90%] border-b-2 border-blue3 outline-none p-2 mt-2" onChange={(e) => setNewSkillId(e.target.value)}>
                                <option value="">Selecione uma skill</option>
                                {skillsDisponiveis.map((skill, i) => (
                                    <option key={skill.id || i} value={skill.id || i}>{skill.name}</option>
                                ))}
                            </select>
                            <button onClick={handleAddSkill} className="px-4 py-2" ><Image src={plus} width={30} height={30} alt="Image" /></button>
                        </div>
                        <div className="w-[100%] flex items-end justify-end mt-5">
                            <button onClick={closeModalAndSave} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900">Salvar</button>
                            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black">Fechar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}