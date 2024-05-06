import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { GetDataQuizzApi } from "../../services/ApiServices";
import _ from 'lodash'
import Header from "../../Header/Header";
import './DetailQuizz.scss'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Question from "./Question";
import { PostSubmitQuizzApi } from "../../services/ApiServices";
import ModalResultQuizz from "./ModalResultQuizz";
import RightContent from "./RightContentQuiz/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DetailQuizz = () => {
    const params = useParams();
    const location = useLocation();
    const [dataQuizz, setDataQuizz] = useState([]);
    const [indexQues, setIndexQues] = useState(0);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataResultQuizz, setDataResultQuizz] = useState([]);
    const [finish, setFinish] = useState(false)
    const quizzId = params.idcode;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    const handleOnNext = () => {
        { dataQuizz && dataQuizz.length > indexQues + 1 && setIndexQues(indexQues + 1) }

    }
    const handleOnPrevious = () => {
        { dataQuizz && indexQues >= 1 && setIndexQues(indexQues - 1) }

    }
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizzClone = _.cloneDeep(dataQuizz)
        // console.log(dataQuizzClone)
        let question = dataQuizzClone.find(item => +item.QuestionId === +questionId)
        if (question && question.answerQus) {
            // console.log(question)
            let b = question.answerQus.map(item => {
                if (+item.id === + answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answerQus = b;
            // console.log('b',b)
        }
        let index = dataQuizzClone.findIndex(item => +item.QuestionId === +questionId)
        if (index > -1) {
            dataQuizzClone[index] = question;
            setDataQuizz(dataQuizzClone)
        }
    }

    const handleSubmit = async () => {
        let payload = {
            quizId: +quizzId,
            answers: [],
        };
        let answersArr = [];
        if (dataQuizz && dataQuizz.length > 0) {
            dataQuizz.forEach(q => {
                let questionIdArr = q.QuestionId;
                let userAnswerIdArr = [];
                q.answerQus.forEach(a => {
                    if (a.isSelected) {
                        userAnswerIdArr.push(a.id)
                    }
                });

                answersArr.push({
                    questionId: +questionIdArr,
                    //will error if datatype not correct
                    userAnswerId: userAnswerIdArr,
                });
            })
        }
        payload.answers = answersArr;
        const response = await PostSubmitQuizzApi(payload);
        // console.log(response)
        if (response && response.EC === 0) {
            setDataResultQuizz({
                countCorrect: response.DT.countCorrect,
                countTotal: response.DT.countTotal,
                quizData: response.DT.quizData
            })
            //Reset all answer to default
            let dataQuizzClone = _.cloneDeep(dataQuizz)
            dataQuizzClone.map(qs => {
                qs.answerQus.map(as => {
                    as.isSelected = false
                })
            })
            setDataQuizz(dataQuizzClone)
            setShowModalResult(true)
            setFinish(true)
            // setSubmitted(true)
            // return;
        } else {
            alert('Smthing wrong !');
        }

    }


    const fetchApiQuestions = async () => {
        const data = await GetDataQuizzApi(quizzId);
        // console.log(data)

        if (data && data.EC === 0) {
            let raw = data.DT;
            let dataResApi = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    let answerQus = [];
                    let questionDescription, img = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            img = item.image
                        }
                        item.answers.isSelected = false;
                        answerQus.push(item.answers)

                        // console.log("check ans",item.answers)
                    })
                    answerQus = _.orderBy(answerQus, ['id'], ['asc']);
                    return { QuestionId: key, answerQus, questionDescription, img }
                }
                )
                .value()
            // console.log(dataResApi)
            setDataQuizz(dataResApi)


        }
    }
    // console.log('check DT Quizz',dataQuizz[1])
    useEffect(() => {
        fetchApiQuestions()
    }, [quizzId])
    // console.log(quizzId)
    const cardContentQuizz = () => (
        <div sx={{ maxWidth: 345 }} className="content-media-left">

            <CardMedia
                className="border-top"
                component="img"
                style={{ width: '100%', height: 'auto' }}
                src={`data:image/jpeg;base64,${location.state.imgTitle}`}
                alt="green iguana"
            />
            <CardContent className="">
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {location?.state?.quizzTitle}
                </Typography>
            </CardContent>
        </div>
    )

    return (
        <>
            <div className="DetailQuizz-container">
                <div className="DQ-title">
                    {/* <Header /> */}
                    <div className="breadcrumb">
                        <Breadcrumb className="breadcrumbitem">
                            <Breadcrumb.Item href="/" className="breadCrumb-href" >Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/us" className="breadCrumb-href">
                                List Quiz
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                </div>
                <div className="DQ-content">
                    <div className="container">
                        <div className="row DQ-content-container">
                            <div className="col- DQ-content-left">
                                <div className="DQ-content-left-title">
                                    {cardContentQuizz()}
                                </div>
                            </div>

                            <div className="col-sm DQ-content-mid">
                                <div className="DQ-content-mid-title">
                                    <div className="DQ-content-question">
                                        <Question
                                            dataQ={dataQuizz && dataQuizz.length > 0 ? dataQuizz[indexQues] : []}
                                            indexQ={indexQues}
                                            setIndexQ={setIndexQues}
                                            handleCheckBox={handleCheckBox}
                                        />
                                        <div className="btn-NextPreQuestion">
                                            <button type="button" className="btn btn-primary  q-child-nextpreButton xs" onClick={() => handleOnPrevious()}>Pre</button>
                                            <button type="button" className="btn btn-secondary  q-child-nextpreButton" onClick={() => handleOnNext()}>Next</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm DQ-content-right">
                                <div className="DQ-content-right-title">
                                    <RightContent
                                        dataQuizz={dataQuizz}
                                        handleSubmit={handleSubmit}
                                        setIndexQ={setIndexQues}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="DQ-footer">

                </div>
                <ModalResultQuizz
                    show={showModalResult}
                    setShow={setShowModalResult}
                    dataResult={dataResultQuizz}
                />
            </div>
        </>

    );
};

export default DetailQuizz;