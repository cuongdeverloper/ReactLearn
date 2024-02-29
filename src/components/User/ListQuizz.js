import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetQuizzApi } from '../../services/ApiServices';
import { useSelector } from 'react-redux';
const ListQuizz = () => {
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

    return (
        <div className='ListQuizz-container'>
            
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
                    <Button variant="primary">Start now</Button>
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