import logo from "@/assets/logo_azul.png";
import check from "@/assets/checked.png";
import Image from 'next/image';
import { ROUTES } from "@/constants/routes";

export default function Register() {

  const style = {
    firstDiv: "w-1/4 md:w-1/3  h-4/5",
    secondDiv: "bg-white w-1/4 md:w-1/3 rounded-[8px] flex flex-col items-center justify-center pt-16 pb-16 gap-5",
    principalDiv: "bg-blue1 h-screen flex flex-row w-[100%] justify-center pt-20 pb-20 items-center gap-12"
  }
  return (
    <div className={style.principalDiv}>
      <div className={style.firstDiv}>
        <div className="flex flex-row items-center gap-5">
          <Image src={logo} alt="img" />
          <h1 className="font-robFont text-white text-[24px]" >Engineering<br/> Technical<br/> School</h1>
        </div>
        <div className="flex flex-col gap-3 m-10">
          <h1 className="font-robFont text-white text-[26px]" >Welcome to ETS</h1>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Start your career</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Acquire knowledge</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Meet people</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Professional experience</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Shape your future</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Work with innovation</h3></div>
          <div className="flex flex-row gap-4 items-end"><Image src={check} alt="check" /><h3 className="font-robFont text-white text-[20px]">Learn from the best</h3></div>
        </div>
        <p className="space betw p center"></p>
      </div>
      <div className={style.secondDiv}>
        <h1 className="font-robFont text-blue0 font-bold text-[35px]" >Register</h1>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="" className=" font-robFont w-[80%] text-start font-bold text-blue0">Edv</label><input  type="text" className=" font-robFont border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your edv..."/>
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="" className=" font-robFont w-[80%] text-start font-bold text-blue0">Name</label><input type="text" className=" font-robFont border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your name..."/>
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="" className=" font-robFont w-[80%] text-start font-bold text-blue0">Email</label><input type="text" className=" font-robFont border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your email..."/>
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <label htmlFor="" className=" font-robFont w-[80%] text-start font-bold text-blue0">Password</label><input type="text" className=" font-robFont border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your pass..."/>
        </div>
        <a className="bg-blue1 w-[80%] p-2 text-white rounded-[8px] font-robFont">Sign Up</a>
        <a href={ROUTES.login} className="font-robFont w-[80%] text-end font-bold text-blue0">Sign In</a>
      </div>
    </div>
  );
}
