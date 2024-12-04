import Card from "@/components/card";
import dataTests from "@/constants/dataTests.json"
import search from "@/assets/search.png"
import Image from "next/image";

const home = () => {
    const styles = {
        h1: "text-blue1 text-2xl",
        box: "flex justify-end w-full", 
        search: "border-2 border-blue1 rounded w-4/12 p-2 mr-20", 
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
                <Image src={search} alt={""} width={50} height={50}/>
            </div>

            <div className="flex justify-center m-10 mx-60 flex-wrap" >
               <Card data={dataTests} />
            </div>
        </div>
        </>
    );
}

export default home;
