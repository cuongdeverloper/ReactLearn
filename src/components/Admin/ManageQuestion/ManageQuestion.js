import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { GetAllQuestionApi,PostNewQuestionForQuizz,PostNewAnswerForQuizz,ApiGetQuestionFromQuizId } from '../../../services/ApiServices';
import { MdLibraryAdd } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { findIndex } from 'lodash';
import './ManageQuestion.scss'
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ManageQuestion = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
 
  const [isPreviewImg, setIsPreviewImg] = useState(false)
  const [selectedOption, setSelectedOption] = useState({})
  const [listQuizz, setListQuizz] = useState([]);
  const initQuestion = [{
    id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },

      ]
  }]
  const [dataPreviewImg, setDataPreviewImg] = useState({
    url: '',
    title: ''
  })
  const [questions, setQuestions] = useState(initQuestion);
  // console.log(questions)
  // const [isCorrect, setIsCorrect] = useState(false)

  const options = listQuizz.map(item => ({
    value: item.id,
    label: `${item.id}: ${item.name}`
  }));
  function urltoFile(url, filename, mimeType){
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename,{type:mimeType}));
}
 //check for login if !authenticated
 
  useEffect(() => {
    fetchListQuizz();
  }, []);

  useEffect(() => {
    if(selectedOption && selectedOption.value) {
      fetchAnswerFromQuiz();
    }
  }, [selectedOption]);

  const fetchAnswerFromQuiz = async() =>{
    let res = await ApiGetQuestionFromQuizId(selectedOption.value);
    console.log('check',res.DT.qa)
    let newQA = [];
    for(let i = 0; i< res.DT.qa.length; i++) {
      let q = res.DT.qa[i];
      if(q.imageFile) {
        q.imageName = `Question ${q.id}.png`;
        q.imageFile = 
          await  urltoFile(`data:text/plain;base64,${q.imageFile}`, `Quention ${q.id}.png`,'imgae/png')

      }
    }
    setQuestions(res.DT.qa)
  }
  const fetchListQuizz = async () => {
    let res = await GetAllQuestionApi();
    setListQuizz(res.DT);
  }
  
  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          }
        ]
      }
      setQuestions([...questions, newQuestion]);
    } if (type === 'REMOVE') {
      const dataRemove = _.cloneDeep(questions)
      const dataQuestion = dataRemove.filter(item => item.id !== id);
      setQuestions(dataQuestion)
    }
  }


  const handleAddRemoveAnswer = (type, Qid, Aid) => {
    const dataClone = _.cloneDeep(questions)
    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,

      };
      const findQuestionIndex = dataClone.findIndex(item => item.id === Qid)
      if (findQuestionIndex !== -1) {
        dataClone[findQuestionIndex].answers.push(newAnswer)
        setQuestions(dataClone)
      }
    }
    else if (type = 'REMOVE') {
      const findDataIndex = dataClone.findIndex(item => item.id === Qid)
      if (findDataIndex !== -1) {
        const filteredAnswers = dataClone[findDataIndex].answers.filter(answer => answer.id !== Aid);
        dataClone[findDataIndex].answers = filteredAnswers;
        setQuestions(dataClone);
      }
      // console.log(findDataIndex)
    }
  }



  const handleOnChangeValue = (type, id, value) => {
    const dataClone = _.cloneDeep(questions);
    if (type === 'QUESTIONDESCRIPTION') {
      const findQuestionIndex = dataClone.findIndex(item => item.id === id)
      if (findQuestionIndex > -1) {
        dataClone[findQuestionIndex].description = value;
        setQuestions(dataClone)
        // console.log(dataClone[findQuestionIndex].description)
      }
    }


  }

  const handleOnchangeFileQuestion = (id, event) => {
    console.log(id, event)
    const dataClone = _.cloneDeep(questions);
    const findQuestionIndex = dataClone.findIndex(item => item.id === id)
    if (findQuestionIndex > -1 && event.target && event.target.files && event.target.files[0]) {
      dataClone[findQuestionIndex].imageFile = event.target.files[0];
      dataClone[findQuestionIndex].imageName = event.target.files[0].name;
      setQuestions(dataClone)
    }
  }

  // onChange={(event) => handleAnswerChecking('CHECKINGBOX',answer.id,questionA.id,event.target.checked)}
  const handleAnswerChecking = (type, idA, idQ, value) => {
    // console.log(type,idA,idQ,value)

    const dataClone = _.cloneDeep(questions);
    // console.log(dataClone)
    const findQuestionIndex = dataClone.findIndex(item => item.id === idQ)
    if (findQuestionIndex > -1) {
      dataClone[findQuestionIndex].answers =
        dataClone[findQuestionIndex].answers.map(answer => {
          if (answer.id === idA) {
            if (type === 'CHECKINGBOX') {
              answer.isCorrect = value
            }
            if (type === 'ANSWERDESCRIPTION') {
              answer.description = value;
            }

          }
          return answer

        })
      setQuestions(dataClone)

    }
  }

  const handleSaving = async() => {
    console.log('cjec', questions)
    console.log(selectedOption)
//valite 
let countCorrect = 0;

    for(const q of questions) {
      countCorrect=0;
      if(_.isEmpty(q.description)) {
        toast.warning('Question description empty');
        return;
      }
      for(const a of q.answers) {
        if(_.isEmpty(a.description)) {
          toast.warning('Answer descriptio empty');
          return;
        }
        if(a.isCorrect ) {
          countCorrect++;
        }
      }
      if(countCorrect === 0) {
        toast.error("Each question much at least 1 correct answer")
        return;
      }
      // console.log(countCorrect)
    }
    if( _.isEmpty(selectedOption)) {
      toast.error('Please choose name quizz');
      return;
    }
    

    for(const question of questions) {
      const q = await PostNewQuestionForQuizz(
        +selectedOption.value,
        question.description,
        question.imageFile);
        for(const answer of question.answers) {
          await PostNewAnswerForQuizz(
            answer.description,
            answer.isCorrect,
            q.DT.id
          )
        } 
    }
    setQuestions(initQuestion)
    toast.success('Successful')
  }



  const handleSetPreviewIMG = (questionId) => {
    setIsPreviewImg(true)
    const dataClone = _.cloneDeep(questions);
    const findQuestionIndex = dataClone.findIndex(item => item.id === questionId)
    if(findQuestionIndex > -1) {
      setDataPreviewImg({
        url : URL.createObjectURL(dataClone[findQuestionIndex].imageFile),
        title:dataClone[findQuestionIndex].imageName
      })
    }
    
  }

  
  return (
    <div className='ManageQuestion-container'>
      <div className='ManageQuestion-title'>
        <h1>Manage Questions</h1>
      </div>
      <div className='ManageQuestion-body'>
        <div className='ManageQuestion-body-Quiz border'>
          <p className='m-3'>Select Quiz</p>
          <Select
            className='SelectQuizz m-3'
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}

          />

        </div>
        <div className='mt-3 m-3'>Add Questions</div>
        {
          questions && questions.length > 0 && questions.map((questionA, indexQ) => {
            return (
              <div key={questionA.id} className='ManageQuestion-body-Question mb-3 border'>
                <div className="mb-3 body-addquestion-container">
                  <label htmlFor={`question-description-${indexQ}`} className="form-label ms-3">Question {indexQ + 1}'s description</label>
                  <input
                    type="text"
                    className="adddes-input form-control ms-2"
                    placeholder='question'
                    value={questionA.description}
                    onChange={(event) => handleOnChangeValue('QUESTIONDESCRIPTION', questionA.id, event.target.value)}
                  />

                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  <div className='group-upload ms-3'>

                    <div className='icon-upload-img-qus' >
                      <label htmlFor={`${questionA.id}`}><RiImageAddLine /></label>
                      {/* make unique id  */}
                    </div>
                    <input
                      className='inputAddQuesDes'
                      type='file'
                      onChange={(event) => handleOnchangeFileQuestion(questionA.id, event)}
                      id={`${questionA.id}`} hidden />

                    <div className='ms-3 divShowImg'>{questionA.imageName ? <span className='spanShowImg' onClick={() => handleSetPreviewIMG(questionA.id)}>{questionA.imageName}</span> : '0 file uploaded'}</div>
                    <div className='icon-addques'>
                      <span onClick={() => handleAddRemoveQuestion('ADD', questionA.id)}><MdLibraryAdd /></span>
                    </div>
                    <div className='icon-minusques ms-2'>
                      {/* {question.length === 1 && <span><FaTrashAlt /></span>} */}
                      {questions.length > 1 && <span onClick={() => handleAddRemoveQuestion('REMOVE', questionA.id)}><FaTrashAlt /></span>}
                      {/* <span onClick={() => handleAddRemoveQuestion('REMOVE',question.id)}><FaTrashAlt /></span> */}
                    </div>

                  </div>
                </div>
                {/* ans */}
                {questionA.answers && questionA.answers.map((answer, indexA) => (
                  <div key={answer.id} className='body-addanswers-container'>
                    <div className='body-addanswers'>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`flexCheckDefault${indexA}`}
                          checked={answer.isCorrect}
                          onChange={(event) => handleAnswerChecking('CHECKINGBOX', answer.id, questionA.id, event.target.checked)}
                        />

                      </div>
                      <div className='form-floating descriptionAdd'>
                        <input type='type'
                          className='form-control'
                          onChange={(event) => handleAnswerChecking("ANSWERDESCRIPTION", answer.id, questionA.id, event.target.value)}
                          value={answer.description}
                        />
                        <label htmlFor={`flexCheckDefault${indexA}`}>Answer {indexA + 1}</label>
                      </div>
                      <div className='icon-addques'>
                        <span onClick={() => handleAddRemoveAnswer('ADD', questionA.id)}><MdLibraryAdd /></span>
                      </div>
                      <div className='icon-minusques ms-2'>
                        {questionA.answers.length > 1 && <span onClick={() => handleAddRemoveAnswer('REMOVE', questionA.id, answer.id)}><FaTrashAlt /></span>}
                        {/* <span onClick={() => handleAddRemoveAnswer('REMOVE', questionA.id, answer.id)}><FaTrashAlt /></span> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            )
          })
        }


        {
          questions && questions.length > 0 &&
          <button className='btn btn-warning' onClick={() => handleSaving()}>SAVE</button>
        }

        {isPreviewImg === true && 
        <Lightbox
          image={dataPreviewImg.url}
          title={dataPreviewImg.title}
          onClose={() => setIsPreviewImg(false)}
        ></Lightbox>
        }

      </div>
      <div className='ManageQuestion-footer'>

      </div>
    </div>
  )
}
export default ManageQuestion