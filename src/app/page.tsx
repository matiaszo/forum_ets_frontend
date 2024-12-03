export default function Home() {

  const style = {
    firstDiv: "w-1/3 h-4/5",
    secondDiv: "bg-white w-1/3 rounded-[8px] flex flex-col items-center justify-center h-4/5 gap-10",
    principalDiv: "bg-blue1 h-screen flex flex-row justify-around pt-20 pb-20 "
  }
  return (
  <div className={style.principalDiv}>
    <div className={style.firstDiv}>
      <h1 className="font-robFont text-white" >PRIMEIRA DIV</h1>
      <p className="space betw p center"></p>
    </div>
    <div className={style.secondDiv}>
      <h1 className="font-robFont text-blue0 font-bold text-[35px]" >Login</h1>
      <div className="w-[100%] flex flex-col items-center">
      <label htmlFor="" className="w-[80%] text-start font-bold text-blue0">Edv</label><input type="text" className="border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your edv..."/>
      </div>
      <div className="w-[100%] flex flex-col items-center">
      <label htmlFor="" className="w-[80%] text-start font-bold text-blue0">Password</label><input type="text" className="border rounded-[8px] w-[80%] h-10 p-2" placeholder="type your pass..."/>
      </div>
      <button className="bg-blue1 w-[80%] p-2 text-white rounded-[8px]">Sign In</button>
    </div>
  </div>
  );
}
