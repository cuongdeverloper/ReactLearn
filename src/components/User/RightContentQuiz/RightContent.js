import { useRef } from 'react'
import CountDownTimer from './CountDownTimer'
import './RightContent.scss'
const RightContent = (props) => {
    const { dataQuizz } = props
    // console.log(dataQuizz)
    const refDiv = useRef([])
    const onTimeUp = () =>{
        props.handleSubmit()
    }
    const questionClassName = (index,question) => {
        // console.log(index,question)
        if(question && question.answerQus.length > 0) {
            let checkSelected = question.answerQus.find(s => s.isSelected === true);
            if(checkSelected) {
                return 'isSelectedClass';
            }
        }
    }

    const handleClickQuestion = (question,index) => {
        props.setIndexQ(index)
        // console.log(refDiv.current)
        if(refDiv.current) {
            refDiv.current.forEach(item =>{
                if(item && item.className === 'div-ques isSelectedClass'){
                    item.className= 'div-ques isSelectedClass'
                }
            })
        }
        //checking selected -> dont need to 
        if(question && question.answerQus.length > 0) {
            let checkSelected = question.answerQus.find(s => s.isSelected === true);
            if(checkSelected) {
                return;
            }
        }

        refDiv.current[index].className = `div-ques`
        
        // console.log(refDiv.current)
    }
    return (
        <div className="rightcontent-container">
            <div className='rightcontent-countdown'>
                <CountDownTimer
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="rightcontent-tablequiz border-top">
                {dataQuizz && dataQuizz.length > 0 && dataQuizz.map((item, index) => {
                    return (
                        <div key={index} 
                            className={`div-ques ${questionClassName(index,item)}`}
                            onClick={() => handleClickQuestion(item,index)}
                            ref={Element => refDiv.current[index] = Element}
                            >
                            {index + 1}
                        </div>
                    )

                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-danger btn-finish" onClick={() => props.handleSubmit()}>Finish</button>

            </div>

        </div>
    )
}
export default RightContent