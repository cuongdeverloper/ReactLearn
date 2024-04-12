import CountDownTimer from './CountDownTimer'
import './RightContent.scss'
const RightContent = (props) => {
    const { dataQuizz } = props
    // console.log(dataQuizz)
    
    return (
        <div className="rightcontent-container">
            <div className='rightcontent-countdown'>
                
            </div>
            <div className="rightcontent-tablequiz border-top">
                {dataQuizz && dataQuizz.length > 0 && dataQuizz.map((item, index) => {
                    return (
                        <div key={index} className="div-ques">
                            {index+1}
                        </div>
                    )

                })}

            </div>
            <button className="btn btn-danger btn-finish" onClick={() => props.handleSubmit()}>Finish</button>

        </div>
    )
}
export default RightContent