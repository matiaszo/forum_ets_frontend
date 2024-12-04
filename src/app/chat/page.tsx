import { Group } from "@/components/group"

export default function Chat(){
    return(
            <div className="flex flex-row m-5 justify-between">
                <div className="flex flex-col gap-4 bg-blue1 rounded-md p-3 items-center justify-center w-[30%]">
                    <h1 className="bg-blue4 rounded-md w-[60%] text-center">
                        Seus grupos
                    </h1>
                    <Group/>
                </div>
                <div className="bg-alice rounded-md w-[50%]">sdlkfjsadfj</div>
            </div>   
    )
}