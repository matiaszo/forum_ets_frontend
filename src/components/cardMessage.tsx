import ImageComponent from "./image";
import data from '@/constants/dataProjects.json'

const idExempleLocalStorege = 1

type IMessage = {
    user : string,
    text: string,
    image : string,
    curUser : boolean
}

const CardMessage = ({ user, text, image, curUser} : IMessage) => {

    /*
    if(curUser){

        return(
            <div className="flex shadow p-2 items-center flex-row max-w-[400px] rounded-md bg-blue5 self-end justify-self-end mr-8">
                <ImageComponent src={image} width={40} height={40} alt="algo" className="rounded-full object-cover  " />
                <div>
                    <h1 className="text-blue1 m-2" >{user}</h1>
                    <p className="ml-2 text-white flex-wrap m-2" >{text}</p>
                </div>
            </div>
        )
    }
    */
    return(
        <div className={"flex shadow p-2 items-center flex text-balance flex-row max-w-[400px] rounded-md " + (curUser ? "bg-blue5 text-white self-end justify-self-end mr-8": "bg-slate-100")}>
            <div>
            <div className="flex" >
                <ImageComponent src={image} width={40} height={40} alt="algo" className="rounded-full object-cover aspect-square" />
                    <h1 className="text-blue1 m-2" >{user}</h1>
            </div>
                <p className="ml-2 text-pretty break-all m-2" >{text}</p>
            </div>
        </div>
    )
}

export default CardMessage;