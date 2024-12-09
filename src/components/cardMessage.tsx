import ImageComponent from "./image";
import data from '@/constants/dataProjects.json'

type IMessage = {
    name : string,
    text: string,
    image : string
}

const cardMessage = (data : IMessage) => {
    <div>
        <h1>{data.name}</h1>
        <ImageComponent src={data.image} width={20} height={20} alt="algo" />
        <p>{data.text}</p>
    </div>
}

export default cardMessage;