import videoHomePage from '../../assests/video-homepage.mp4'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomePage.scss'
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const handleHomePageStart = () => {
        navigate('/login')
    }
    const enjoying = () => {
        navigate('/us')
    }
    return (
        <div className="HomePage-container">
            <video autoPlay muted loop className='videoHomePage' >
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='HomePage-content '>
                <div className='HomePage-titlecontent '>
                    React
                    The library for web and native user interfaces
                </div>
                <div className='HomePage-textcontent'>
                    React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.
                </div>
                <div className='HomePage-start'>
                    {!isAuthenticated ? <button className='HomePage-start' onClick={() => handleHomePageStart()}>Get start</button> : <button className='HomePage-start' onClick={()=> enjoying()}>Enjoing</button>}
                    
                </div>
            </div>
        </div>

    )
}
export default HomePage