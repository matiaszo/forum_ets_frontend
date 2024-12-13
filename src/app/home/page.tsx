"use client";

import Card from "@/components/cardNoticia";
import { Header } from "@/components/header";
import dataTests from "@/constants/dataTests.json";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import plus from "@/assets/icons8-adicionar-100.png";
import Image from "next/image";
import { useState } from "react";

import { CldImage, CldUploadButton, CldUploadWidget  } from 'next-cloudinary';

interface noticia {
  image: string;
  title: string;
  content: string;
}

interface user {
    id: string;
    name: string;
    image: string;
    bio: string;
    gitUseraname: string | null;
    instructor: number;
    isUser: boolean;
}

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;


const Home = () => {
    const u : user = {id: "1", name: "Mariana", bio: "slaaa", image: "https://img.freepik.com/fotos-premium/um-coala-com-rosto-preto-e-branco_900101-50964.jpg", gitUseraname: 'xmarimarquesh', instructor: 1, isUser: true}
    
    const [usuario, setUsuario] = useState(u);

  const initialNoticias: noticia[] = [
    {
      image: "https://www.autoindustria.com.br/wp-content/uploads/2017/07/f%C3%A1brica-bosch.jpg",
      title: "Fábrica e tals",
      content: "novidade nao sei o que lá",
    },
    {
      image: "https://www.bosch-press.com.br/pressportal/br/media/dam_images_br/bosch-xc-ki-studie-06-2.jpg",
      title: "Braço e tals",
      content: "muitos braços vindos ai",
    },
  ];

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [notice, setNotice] = useState<noticia[]>(initialNoticias);
  const [newImage, setNewImage] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNotice = () => {
    if (newTitle && newContent && newImage) {
      const newNotice: noticia = {
        image: newImage,
        title: newTitle,
        content: newContent,
      };
      setNotice((prev) => [...prev, newNotice]);
      setModalAdd(false);
      setNewImage("");
      setNewTitle("");
      setNewContent("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleUploadComplete = (result: any) => {
    if (result?.info?.public_id) {
      const publicId = result.info.public_id;
      console.log('Uploaded file public_id:', publicId);
    } else {
      console.error('Upload failed or public_id is not present in the result');
    }
  };

  return (
    <div className="flex flex-col mt-20">
      <Header />
      <CldImage
      src="kmhakyq32sm9meybbsmy" // Use this sample image or upload your own via the Media Explorer
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      crop={{
        type: 'auto',
        source: true
      }}
      alt="teste"
    />
    <CldUploadWidget
        uploadPreset="se0jsxlx" // Your Cloudinary upload preset
        onSuccess={handleUploadComplete} // Handler to get the uploaded file information
        onUploadAdded={handleUploadComplete} // Handler to get the uploaded file information
      >
        {({ open }) => (
          <button onClick={() => open()}>
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
      <div className="mr-10 ml-10 mb-10">
        {modalAdd && (
            <div className="h-screen w-screen object-contain flex justify-center fixed items-center top-0 left-0 bg-[#000000A0]">
            <div className="bg-white p-12 rounded-lg w-[600px] ">
                <form id="modal" className="">
                <h1 className="text-blue1 text-3xl">Adicionar Noticia</h1>
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
                <input type="text" placeholder="Digite o título da notícia" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "/>
                <textarea placeholder="Digite o conteúdo da notícia" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full p-4 my-4 border-b border-blue3 outline-none ease-in-out hover:border-blue1 "/>
                </form>
                <div className="w-[100%] flex items-end justify-end mt-5">
                <button onClick={handleAddNotice} className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800">Salvar</button>
                <button onClick={() => setModalAdd(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800">Fechar</button>
                </div>
            </div>
            </div>
        )}
        <div className="pr-20 pl-20 pt-10 flex flex-col items-center w-[100%]">
            <div className="flex flex-col flex-wrap w-[100%]">
            <h1 className="text-blue1 text-3xl">As principais notícias do setor aqui</h1>
            <p>Fique atento às datas e novidades por aqui.</p>
            </div>
            <div className="flex justify-end w-[100%]">
            <div className="flex items-end justify-end cursor-pointer w-[100%]" onClick={() => setModalAdd(true)}>
                { usuario.instructor == 1 ? (
                    <div className="flex justify-end">
                        <div  className="w-auto" onClick={() => setModalAdd(true)}>
                            <Image src={plus} width={50} height={50} alt="Adicionar Notícia" />
                        </div>
                    </div>

                ) : (
                    <>
                    </>
                )}
            </div>
            </div>
            <div className="flex justify-center mt-10 flex-col gap-8 w-[100%]">
            {notice.map((item, index) => (
                <Card key={index} title={item.title} content={item.content} image={item.image} />
                ))}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Home;
