import Topic from "@/components/topic"

export default function Profile() {
    return(
        <>
           <div className="flex flex-col border-black rounded-md m-8 font-robFont">
                <div className="flex flex-col justify-center items-center w-full mt-5">
                    <p className="text-blue1 text-3xl ">Titulo da sessao</p>
                    <p className="text-blue4 text-md">Descrição da sessão</p>
                </div>
                <p className="text-lg">Nome do instrutor</p>

                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
           </div>
        </>
    )
}
