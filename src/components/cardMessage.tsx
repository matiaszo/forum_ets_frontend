import ImageComponent from "./image";
import data from '@/constants/dataProjects.json'

type IMessage = {
    user : string,
    text: string,
    image : string
}

const CardMessage = ({ user, text, image } : IMessage) => {
    return(
        <div className="flex shadow p-2 items-center flex-row max-w-[400px]  rounded-md bg-slate-100">
            <ImageComponent src={image} width={40} height={40} alt="algo" className="rounded-full object-cover " />
            <div>
                <h1 className="text-blue1 m-2" >{user}</h1>
                <p className="ml-2 flex-wrap m-2" >{text}</p>
            </div>
        </div>
    )
}

export default CardMessage;