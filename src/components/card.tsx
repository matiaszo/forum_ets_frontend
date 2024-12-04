import dynamic from "next/dynamic";
import Image from "next/image";
import { StaticImageData } from "next/image";
import py from "@/assets/pyimage.webp"

type CardData = {
    title: string;
    image: string;
    mainQuestion: string;
}

type CardProps = {
    data: CardData[]; 
}

const Card = ( {data} : CardProps) => {
    return (
        <>
        {data.map(async (item, index) => {
            const img = await import(`@/assets/${item.image}`);
            return(
            <div className={styles.card} key={index}> 
                <div>
                    <Image src={img} alt={item.title} width={200} height={200} className={styles.img} />
                    <h1 className={styles.title} >{item.title}</h1>
                    <p>{item.mainQuestion}</p>
                </div>
            </div>
            )
            
        })}
        </>
    );
}

const styles = {
    card : 'flex m-2 justify-center items-center w-60 rounded p-4 shadow-lg shadow-[rgb(30 41 59)]',
    img : 'rounded',
    title: 'text-blue1 text-2xl my-2'
}

export default Card;
