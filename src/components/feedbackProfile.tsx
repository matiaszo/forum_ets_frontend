import { CardFeedback } from "./cardFeedback"

interface feedback {
    id: string;
    stars : number,
    text : string,
    public : boolean,
    projectName : string,
    user : {
        id : string,
        image : string,
        name : string,
        isUser : boolean,
    }
}


export const FeedbackProfile = ({feedbacks} : {feedbacks : feedback[]}) => {
    
    return (
        <div className="w-[100%]">
            {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((feed) => (
                    feed.user.isUser || feed.public ? (
                        <CardFeedback
                            key={feed.id}
                            id={feed.id}
                            stars={feed.stars}
                            text={feed.text}
                            publico={feed.public}
                            projectName={feed.projectName}
                            user={{
                                id: feed.user.id,
                                image: feed.user.image,
                                name: feed.user.name,
                                isUser: feed.user.isUser,
                            }}
                        />
                    ) : (
                        <div key={feed.id} />
                    )
                ))
            ) : (
                <p className="text-gray-400">Nenhum feedback encontrado.</p>
            )}
        </div>

    )
}