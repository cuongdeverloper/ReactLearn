import videoHomePage from '../../assests/video-homepage.mp4'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomePage.scss'
import { useTranslation,Trans } from 'react-i18next'   //src\utils\i18n.js  
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const {t} = useTranslation();
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
                {t('Homepage.title1')}
                </div>
                <div className='HomePage-textcontent'>
                    {t('Homepage.title2')}
                </div>
                <div className='HomePage-start'>
                    {!isAuthenticated ? <button className='HomePage-start' onClick={() => handleHomePageStart()}>{t('Homepage.title3.btnlogin')}</button> : <button className='HomePage-start' onClick={()=> enjoying()}>Enjoing</button>}
                    
                </div>
            </div>
        </div>

    )
}
export default HomePage