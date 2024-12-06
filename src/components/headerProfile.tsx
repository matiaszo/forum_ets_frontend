export const HeaderProfile = ({ activeTab, setActiveTab }: any) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-center w-[50%] mb-1">
                <a
                    className={`text-blue2 text-[18px] text-center cursor-pointer pb-1 ${
                        activeTab === 'inicio' ? 'border-b border-blue2 transition-all duration-300' : ''
                    }`}
                    onClick={() => setActiveTab('inicio')}
                >
                    Inicio
                </a>
                <div className="h-5 w-[1px] bg-blue3" />
                <a
                    className={`text-blue2 text-[18px] text-center cursor-pointer pb-1 ${
                        activeTab === 'feedback' ? 'border-b border-blue2 transition-all duration-300' : ''
                    }`}
                    onClick={() => setActiveTab('feedback')}
                >
                    Feedback
                </a>
                <div className="h-5 w-[1px] bg-blue3" />
                <a
                    className={`text-blue2 text-[18px] text-center cursor-pointer pb-1 ${
                        activeTab === 'interacoes' ? 'border-b border-blue2 transition-all duration-300' : ''
                    }`}
                    onClick={() => setActiveTab('interacoes')}
                >
                    Interações
                </a>
            </div>
        </div>
    );
};
