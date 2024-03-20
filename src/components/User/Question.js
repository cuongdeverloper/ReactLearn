import _ from "lodash";
import './Question.scss'
import { useState } from "react";
const Question = (props) => {
    const { dataQ, indexQ } = props;
    // console.log('checkdtq', dataQ)

    if (_.isEmpty(dataQ)) {
        return (
            <>
            </>
        )
    }

    const handleChecked = (event, ansId, quesId) => {
        // console.log(event.target.type)

        // console.log("checkboxchecking ",ansId,quesId)
        props.handleCheckBox(ansId, quesId)
    }

    return (
        <div className="q-child-container">
            <div className="q-child-question">
                {dataQ.img && dataQ.img.length > 0 ?
                    <div className="q-child-question-img"> <img src={`data:image/jpeg;base64,${dataQ.img}`} /></div>
                    : <div className="q-child-question-img"></div>}


            </div>

            <div className="q-child-answers">
                <p className="q-child-ans-description"> {indexQ + 1}.   {dataQ.questionDescription} </p>
                {dataQ.answerQus && dataQ.answerQus.length > 0 && dataQ.answerQus.map((ans, index) => {
                    return (

                        <div className="a-child" key={`answer-${index}`}>
                            <div className="form-check q-child-answers-content">
                                <div className="q-child-answers-content-checkbox"> 
                                    <input className="form-check-input "
                                    checked={ans.isSelected}
                                    type="checkbox"
                                    id={`defaultCheck${index}`}
                                    onChange={(event) => handleChecked(event, ans.id, dataQ.QuestionId)} />
                                </div>
                                <div className="q-child-answers-content-description">
                                    <label className="form-check-label ans-lb" htmlFor={`defaultCheck${index}`}>
                                        {ans.description}
                                    </label>
                                </div>

                                
                            </div>
                        </div>
                    )
                })
                }

            </div>

        </div>
    )
}
export default Question