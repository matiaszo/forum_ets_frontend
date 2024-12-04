import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import ets_logo from "@/assets/ets_logo.png"
import user_logo from "@/assets/user_logo.png"



export const Header = ({first, second, third, fourth}: any) => {

    const style= {
        option: "font-robFont text-blue5 text-xl"
    }
    return(
        <>
        <div className="flex items-center ml-6 mr-6">

            <h1 className="">
                <Image src={ets_logo} width={100} height={200} alt="ets logo"/>
            </h1>

            <div className="flex flex-grow gap-32 justify-end items-center">
                <Link className={style.option} href={ROUTES.home}>{first}</Link>
                <Link className={style.option} href={ROUTES.forum}>{second}</Link>
                <Link className={style.option} href={ROUTES.chat}>{third}</Link>
                <Link className={style.option} href={ROUTES.project}>{fourth}</Link>
                <Link  href={ROUTES.chat}><Image src={user_logo} width={50} height={50} alt="ets logo"/></Link>
            </div>
        </div>
        </>
    )
}