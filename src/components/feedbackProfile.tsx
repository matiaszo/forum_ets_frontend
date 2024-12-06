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
            {feedbacks.map((feed) => (
                feed.user.isUser ? (
                    <CardFeedback id={feed.id} key={feed.id} stars={feed.stars} text={feed.text} publico={feed.public} projectName={feed.projectName} user={{
                        id: feed.user.id,
                        image: feed.user.image,
                        name: feed.user.name,
                        isUser: feed.user.isUser
                    }} />
                ) : feed.public ? (
                    <CardFeedback id={feed.id} key={feed.id} stars={feed.stars} text={feed.text} publico={feed.public} projectName={feed.projectName} user={{
                        id: feed.user.id,
                        image: feed.user.image,
                        name: feed.user.name,
                        isUser: feed.user.isUser
                    }} />
                ) : (
                    <div key={feed.id}>
                    </div>
                )
            ))}
        </div>
    )
}