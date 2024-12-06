"use client"
import { useState } from "react";

import Image from "next/image";

import editPhoto from "@/assets/edit.png";

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUseraname: string;
    instructor: number;
    isUser: boolean;
}
interface skillInterface {
    id: string;
    title: string;
    image: string;
}

export const InicioProfile = ({ usuario }: { usuario: user }) => {
    const [selectedColor, setSelectedColor] = useState("blue"); 
    const [showColors, setShowColors] = useState(false); 
    
    const [bio, setBio] = useState("Oiê ME CHAMO MARI"); 

    const [theme, setTheme] = useState('dark');

    const [skills, setSkills] = useState<skillInterface[]>([]);

    
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

    const [gitHubName, setGitHubName] = useState(usuario.gitUseraname)
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeModalAndSave = (name : string) => {
        setIsModalOpen(false)
        setGitHubName(name)
    };

    const teste : skillInterface[] = [
        {id: '1', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '2', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '3', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '4', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '5', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '6', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '7', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '8', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '9', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}, 
        {id: '11', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '12', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '13', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'},
        {id: '14', title: 'python', image : 'https://upload.wikimedia.org/wikipedia/commons/3/31/Python-logo.png'}
    ]

    return (
        <div>
            {usuario.gitUseraname ?
                (
                    <div className="w-[100%] mb-5">
                        <div className="shadow-md w-[100%] rounded-lg p-2">
                            <h1 className="text-[22px] font-robFont mb-2">GitHub Status</h1>
                            <div className="flex flex-row w-[100%] items-center justify-center sm:flex-wrap">
                                <img src={`https://github-readme-stats.vercel.app/api?username=${usuario.gitUseraname}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=false&count_private=false&disable_animations=false&theme=${gitTheme}&locale=en&hide_border=true`} className="h-[250px]" alt="stats graph" />
                                <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${usuario.gitUseraname}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=12&theme=${gitTheme}&hide_border=true`} className="h-[250px]" alt="languages graph" />
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
                                                    setSelectedColor(color);
                                                    setGitTheme(themes[color]);
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
                            
                            <div className="w-[100%] justify-end flex">
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
                    </div>
                ) : (
                    <div className="w-[100%] mb-2">
                        <div className="shadow-md w-[100%] h-1/2 rounded-lg p-2">
                            <h1 className="cursor-pointer">Add GitHub Status</h1>
                        </div>
                    </div>
                )}

            {teste && teste.length > 0 ? (
                <div className="w-[100%] mb-2">
                    <div className="shadow-md w-[100%] rounded-lg p-2">
                        <h1 className="text-[22px] font-robFont mb-2">Skills</h1>
                        <div className="flex flex-wrap gap-5 items-center justify-center">
                            {teste.map((skill) => (
                                <div key={skill.id} className="flex flex-col items-center">
                                    <img
                                        src={skill.image}
                                        alt={skill.title}
                                        width={100}
                                        height={100}
                                    />
                                    <h3>{skill.title}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="w-[100%] justify-end flex">
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
                </div>

            ) : (
                <div className="w-[100%] mb-2">
                    <div className="shadow-md w-[100%] h-1/2 rounded-lg p-2">
                        <h1 className="cursor-pointer">Add Skills</h1>
                    </div>
                </div>
            )
            }

        </div>
    );
}