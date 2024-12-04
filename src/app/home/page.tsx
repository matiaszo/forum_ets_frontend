import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json"
import search from "@/assets/search.png"
import Image from "next/image";

const home = () => {
    const styles = {
        h1: "text-blue1 text-2xl",
        box: "flex justify-end w-full pr-14 gap-9", 
        search: "border-2 border-blue1 rounded w-4/12 p-2", 
    }

    return (
        <>
        <div className="flex flex-col">
            <div className="flex flex-col flex-wrap m-6">
                <h1 className={styles.h1}>Acesse o fórum do setor aqui</h1>
                <p >Converse com seus colegas sobre os mais diversos tópicos.</p>
            </div>

            <div className={styles.box}>
                <input className={styles.search} type="text" placeholder="Pesquise por título, pergunta.." />
                <Image className="cursor-pointer" src={search} alt={""} width={50} height={50}/>
            </div>

            <div className="flex justify-center m-10 mx-35 flex-wrap" >
                {dataTests.map(async (item, index) => {
                    return(
                        <Card title={item.title} mainQuestion={item.mainQuestion} image={item.image} />
                    )
                    
                })}
            </div>
        </div>
        </>
    );
}

export default home;
