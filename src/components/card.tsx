import dynamic from "next/dynamic";
import Image from "next/image";
import { StaticImageData } from "next/image";
import py from "@/assets/pyimage.webp"
import { start } from "repl";

type CardData = {
    title: string;
    image: string;
    mainQuestion: string;
}

type CardProps = {
    data: CardData[]; 
}

const limit = 25

const Card = ( {data} : CardProps) => {
    return (
        <>
        {data.map(async (item, index) => {
            const img = (await import(`@/assets/${item.image}`)).default;
            return(
            <div className={styles.container} key={index}> 
                <div className="">
                    <Image src={img} alt={item.title} width={200} height={200} className={styles.img} />
                    <h1 className={styles.title} >{item.title}</h1>
                    <p className={styles.question}> {item.mainQuestion.substring(0, limit)}{item.mainQuestion.length > limit ? "..." : ""}
                    </p>
                </div>
            </div>
            )
            
        })}
        </>
    );
}

const styles = {
    container:
      "flex m-2 justify-center items-center w-60 rounded p-4 shadow-lg shadow-[rgb(30 41 59)]",
    img: "rounded",
    title: "text-blue1 text-2xl my-2",
    question:"w-full text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap",
  };


export default Card;
