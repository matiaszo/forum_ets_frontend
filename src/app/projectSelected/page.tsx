import { Header } from "@/components/header";
import  data from '@/constants/dataProjects.json'

const projectPage = () => {
    return(
        <>
        <Header/>
        <div className="h-[480px] overflow-y-scroll" >
            <div className="mt-24 ml-8" >
                <h1 className={styles.title}> Título do projeto</h1>
                <p className="flex flex-wrap max-w-[750px]" ></p>
            </div>
            <div className="mt-6 ml-8 ">
            <h2>
                <input type="checkbox" id="objetivo1" className={styles.checkbox}/>
                <label  className="ml-2">Objetivo 1</label>
            </h2>
            <h2>
                <input type="checkbox" id="objetivo2" className={styles.checkbox}/>
                <label  className="ml-2">Objetivo 2</label>
            </h2>
            <h2>
                <input type="checkbox" id="objetivo3" className={styles.checkbox}/>
                <label  className="ml-2">Objetivo 3</label>
            </h2>
            </div>
        </div>


        <hr/>

        <div>
           
        </div>
        </>
    )
    
}

const styles= {
    title: "text-blue1 text-3xl mb-4",
    checkbox : 'w-4 h-4 border-2 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 checked:bg-green-500 checked:border-green-500 transition-colors duration-200 ease-in-out'
}

// na criação do projeto validar um máximo de carcateres para o nome


export default projectPage;