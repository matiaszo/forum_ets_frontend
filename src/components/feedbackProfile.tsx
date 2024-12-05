import { CardFeedback } from "./cardFeedback"

interface feedback {
    id: string,
    stars : number,
    text : string,
    public : boolean,
    projectName : string,
    user : {
        id : string
        image : string
        name : string
    }
}

export const FeedbackProfile = ({feedbacks} : {feedbacks : feedback[]}) => {
    
    return (
        <div className="w-[100%]">
            {feedbacks.map((feed) => (
                <CardFeedback stars={feed.stars} text={feed.text} publico={feed.public} projectName={feed.projectName} user={{
                    id: feed.user.id,
                    image: feed.user.image,
                    name: feed.user.name
                }} />
            ))}
        </div>
    )
}