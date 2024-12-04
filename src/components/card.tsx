import Image from "next/image";

const card = (data  : []) => {

    return(

    {data.map((item) =>  (

        <>
        <div>
            <Image src={item.image} />
            <h1>{item.title}</h1>
            <p>{item.mainQuestion}</p>
        </div>
        </>
    ))})
}

export default card;