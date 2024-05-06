import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetQuizzApi } from '../../services/ApiServices';
import { useSelector } from 'react-redux';
import Particles2 from '../ParticlesBG/Particles2';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const ListQuizz = () => {
    const navigate = useNavigate();
    const [arrayQuizz, setArrayQuizz] = useState([]);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    useEffect(()=> {
        getQuizzDate();
    },[])
    const getQuizzDate = async() => {
        if(isAuthenticated) {
            try {
                const data = await GetQuizzApi();
                if (data && data.EC === 0) {
                    setArrayQuizz(data.DT);
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        }
    };
    // console.log(arrayQuizz)
    return (
        
        <div className='ListQuizz-container'>
            {arrayQuizz && arrayQuizz.length===0&&
                <h5 className='no-quiz-here'>
                    There is no quiz here !
                </h5>
            }
            <Particles2 />
            
                <div className='ListQuizz-Content'>
                        <div className='ListQuizz-Content-Title'>
                                <h3>
                                    COURSES
                                </h3>
                        </div>
                        <div className='ListQUizz-Content-Body'>
                        {isAuthenticated && arrayQuizz && arrayQuizz.length >0 && arrayQuizz.map((quizz,index) => {
                    return(
                        
                        <Card className='card-list' key={`${index}-quizz`} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`data:image/jpeg;base64,${quizz.image}`} />
                <Card.Body>
                    <Card.Title>Quizz {index + 1}</Card.Title>
                    <Card.Text>
                        {quizz.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => {navigate(`/quizz/${quizz.id}`, {state :{quizzTitle: quizz.description, imgTitle : `${quizz.image}`}})}}>Start now</Button>
                                                            {/* Navigate (path , state )  How do you pass data when using the navigate function in react router v6 */}
                </Card.Body>
            </Card>
                    )
                })}
                        </div>
                </div>
                
            
            
        </div>
    )
}
export default ListQuizz