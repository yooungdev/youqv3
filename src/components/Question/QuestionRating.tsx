import RatingUp from '../../utils/svg/rating_up.svg'
import RatingDown from '../../utils/svg/rating_down.svg'
import Button from 'components/UI/Button'
import { useState } from 'react'


const QuestionRating = () => {
    const [isHoverUp, setIsHoverUp] = useState(false)
    const [isHoverDown, setIsHoverDown] = useState(false)


    return (
        <div className="flex bg-[#f5f5f5] mt-[15px] rounded-[20px] py-[7px] px-[16px]">
            <button onMouseEnter={() => setIsHoverUp(true)} onMouseLeave={() => setIsHoverUp(false)}>
                <RatingUp fill={isHoverUp ? '#4971FF' : '#86a8fc'} height={19} width={19} />
            </button>
            <div className="mx-[12px] h-full w-[2px] bg-[#E5E5E5]" />
            <button onMouseEnter={() => setIsHoverDown(true)} onMouseLeave={() => setIsHoverDown(false)}>
                <RatingDown fill={isHoverDown ? 'red' : '#636466'} height={19} width={19} />
            </button>
        </div>
    )
}


export default QuestionRating