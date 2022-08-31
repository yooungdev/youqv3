import { useRouter } from 'next/router'
// components/UI
import Avatar from '../UI/Avatar'



type QuestionQACommentProps = {
    comment: any
}

const QuestionQAComment = ({ 
    comment 
}: QuestionQACommentProps) => {

    const router = useRouter()


    return (
        <div className='flex items-center justify-between mt-[15px]'>
            <Avatar
                onClick={() => router.push(`/profile/${comment?.authorId}`)}
                src={comment?.author?.image}
                width={30}
                height={30}
                isConfirmed={comment?.author?.isConfirmed}
                className="cursor-pointer rounded-full"
            />
            <p style={{
                overflowWrap: 'anywhere'
            }} className=" w-[93%] text-[18px]">
                {comment?.text}
            </p>
        </div>
    )
}


export default QuestionQAComment