import { ROUTES } from "@/constants/routes";
import Link from "next/link";


export const Header = () => {
    return(
        <>
            <h1>
                <Link className="options" href={ROUTES.chat}>Home</Link>
            </h1>
        </>
    )
}