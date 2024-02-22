import videoHomePage from '../../assests/video-homepage.mp4'
import { useSelector } from 'react-redux'
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account)

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
                    <button className='HomePage-start'>Get start</button>
                </div>
            </div>
        </div>

    )
}
export default HomePage