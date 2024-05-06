import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
const Language = () => {
    const {t, i18n} = useTranslation();
    const handleChangeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }
    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Việt Nam' : 'English'} id="basic-nav-dropdown1" className='languege-setting'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>VietNam</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default Language