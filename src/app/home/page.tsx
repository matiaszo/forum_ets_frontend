const home = () => {

    const styles = {
        h1: "text-blue1 text-2xl",
        search : "border-2 border-blue1 rounded w-4/12 p-2 self-end",
        box: "flex flex-wrap flex-row w-full items-end justify-self-end"
    }

    return(
        <>
        <div className="flex flex-col">

            <div className="flex flex-col flex-wrap">
                <h1 className={styles.h1}> Acesse o fórum do setor aqui</h1>
                <p>Converse com seus colegas sobre os mais diversos tópicos.</p>
            </div>

            <div className={styles.box}>
                <input className={styles.search} type="text" placeholder="Pesquise por título, pergunta.." />
            </div>

            <div>
                {/* aqui os cards */}
            </div>

        </div>
        </>

    )
}

export default home;