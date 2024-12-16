"use client"
import { useEffect, useState } from "react";

import Image from "next/image";

import editPhoto from "@/assets/edit.png";

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUsername: string | null;
    instructor: number;
    isUser: boolean;
}

interface skillInterface {
    id: string;
    name: string;
    image: string;
}


export const InicioProfile = ({ usuario, skills }: { usuario: user, skills: skillInterface[] }) => {
    const [selectedColor, setSelectedColor] = useState<string>('blue');
    const [showColors, setShowColors] = useState(false); 
    
    const [bio, setBio] = useState("Oiê ME CHAMO MARI"); 

    const [theme, setTheme] = useState('dark');

    // const [skills, setSkills] = useState<skillInterface[]>([]);

    useEffect(() => {
        if (selectedColor) {
          setGitTheme(themes[selectedColor]);
        }

    }, [selectedColor]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedColor = localStorage.getItem("colorGit");
            if (storedColor) {
                setSelectedColor(storedColor);
            }
        }
    }, []);
    
    const colors = ["red", "blue", "green", "black", "purple"];
    const themes: { [key: string]: string } =  theme == 'dark' ? {
        red: "shadow_red",
        blue: "transparent",
        green: "shadow_green",
        black: "graywhite",
        purple: "buefy",
    } : {
        red: "maroongold",
        blue: "github_dark",
        green: "merko",
        black: "dark",
        purple: "midnight-purple",
    }
    
    
    const [gitTheme, setGitTheme] = useState(themes.blue);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [gitHubName, setGitHubName] = useState(usuario.gitUsername)
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeModalAndSave = (name : string) => {
        setIsModalOpen(false)
        setGitHubName(name)
    };


    return (
        <div>
            {usuario.gitUsername ?
                (
                    <div className="w-[100%] mb-1">
                        <div className="shadow-md w-[100%] rounded-lg p-2">
                            <h1 className="text-[22px] font-robFont mb-2">GitHub Status</h1>
                            <div className="flex flex-row w-[100%] items-center justify-center sm:flex-wrap">
                                <img src={`https://github-readme-stats.vercel.app/api?username=${usuario.gitUsername}&hide_name=false&hide_rank=false&show_icons=true&include_all_commits=false&count_private=false&disable_animations=false&theme=${gitTheme}&locale=en&hide_border=true`} className="h-[250px]" alt="stats graph" />
                                <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${usuario.gitUsername}&locale=en&hide_name=false&layout=compact&card_width=320&langs_count=12&theme=${gitTheme}&hide_border=true`} className="h-[250px]" alt="languages graph" />
                            </div>
                            {usuario.isUser ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: selectedColor,
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowColors(!showColors)}
                                />

                                {showColors && (
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                    backgroundColor: color,
                                                    border: "1px solid #ccc",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    localStorage.setItem('colorGit', color);
                                                    setGitTheme(themes[color]);
                                                    setSelectedColor(color);
                                                    setShowColors(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            ) : (
                                <></>
                            )}
                            
                        </div>
                    </div>
                ) : (
                    <div className="w-[100%] mb-2">
                        <div className="shadow-md w-[100%] h-1/2 rounded-lg p-2">
                                {usuario.isUser ? (
                                    <button>
                                        Adicione seu GitHub Status em "Editar Perfil"
                                    </button>
                                ) : (
                                    <>
                                        <h1 className='text-gray-400'>O usuário nao possui GitHub Status</h1>
                                    </>
                                )}
                        </div>
                    </div>
                )}

            {skills && skills.length > 0 ? (
                <div className="w-[100%] mb-2">
                    <div className="shadow-md w-[100%] rounded-lg p-2">
                        <h1 className="text-[22px] font-robFont mb-2">Skills</h1>
                        <div className="flex flex-wrap gap-5 items-center justify-center p-2">
                            {skills.map((skill, index) => (
                                <div key={skill.id || index} className="flex flex-col items-center">
                                    <img
                                        src={skill.image}
                                        alt={skill.name}
                                        width={100}
                                        height={100}
                                        className="rounded-lg"    
                                    />
                                    <h3>{skill.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            ) : (
                <div className="w-[100%] mb-2">
                    <div className="shadow-md w-[100%] h-1/2 rounded-lg p-2">
                    {usuario.isUser ? (
                        <button>
                            Adicione Skills em "Editar Perfil"
                        </button>
                    ) : (
                        <>
                            <h1 className='text-gray-400'>O usuário nao adicionou suas Skills</h1>
                        </>
                    )}
                    </div>
                </div>
            )
            }

        </div>
    );
}