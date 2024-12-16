import Link from "next/link";
import Image from "next/image";
import blueColor from "@/assets/blueColor.jpg"
import { ROUTES } from "@/constants/routes";

const Topic = ({id,title, description }: {id:number, title: string; description: string }) => {
  const style = {
    image: "h-[70px] w-[30px]",
  };

  return (
    <Link href={`${ROUTES.topic}/${id}`}>
      <div className="flex items-center shadow-md rounded-xl p-3 font-robFont mb-3 text-black">
        <Image className={style.image} src={blueColor} alt="blue" />
        <div className="flex flex-col ml-10 min-w-[90%]">
          <h1 className="text-blue1 text-3xl mb-3 font-robCondensed">{title}</h1>
          <h3 className="ml-1">{description}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Topic;