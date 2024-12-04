import Card from "@/components/card"
import dataTests from '@/constants/dataTests.json'
import add from '@/assets/icons8-adicionar-100.png'
import addAnimate from '@/assets/icons8-adicionar.gif'
import Image from "next/image"

const page = () => {
    return(
        <>
            <div className={styles.header} >
                <h1 className={styles.title} >Seus projetos</h1>
                <p>Seus projetos aparecem aqui</p>
                <div className="flex justify-end w-full pr-14 gap-9">
                    <Image src={add} width={50} height={50} alt="" className={styles.icon}/>
                </div>
            </div>
            <div className={styles.container}>
                {dataTests.map(async (item, index) => {
                    return (
                        <Card title={item.title} mainQuestion={item.mainQuestion} image={item.image} />
                    )
                })}
            </div>
        </>
    )
}

const styles = {
    title : 'text-blue1 text-3xl',
    header: ' m-10',
    container: 'flex justify-center items-center flex-wrap m-10 mx-35',
    icon: 'cursor-pointer'
}

export default page;