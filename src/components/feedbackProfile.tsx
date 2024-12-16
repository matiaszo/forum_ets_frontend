import { useState, useEffect } from 'react';
import { CardFeedback } from "./cardFeedback";

interface Feedback {
    id: number;
    stars: number;
    text: string;
    public: boolean;
    projectName: string;
    giver: {
        id: number;
        image: string;
        name: string;
    };
}

export const FeedbackProfile = ({isUser} : {isUser: boolean}) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAuthData = () => {
        return {
            token: localStorage.getItem("token"),
            id: localStorage.getItem("id"),
        };
    };

    const retorno = getAuthData();

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile/feedback/${retorno.id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${retorno.token}` 
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar feedbacks');
                }
                const data = await response.json();

                console.log("DADOS FEEDBACK",data);

                setFeedbacks(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <p>Carregando feedbacks...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="w-[100%]">
            {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((feed, i) => (
                    isUser || feed.public ? (
                        <CardFeedback
                            key={feed.id || i}
                            id={feed.id}
                            stars={feed.stars}
                            text={feed.text}
                            publico={feed.public}
                            projectName={feed.projectName}
                            isUser={isUser}
                            user={{
                                id: feed.giver.id,
                                image: feed.giver.image,
                                name: feed.giver.name,
                            }}
                        />
                    ) : (
                        <div key={feed.id || i} />
                    )
                ))
            ) : (
                <p className="text-gray-400">Nenhum feedback encontrado.</p>
            )}
        </div>
    );
};
