import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaReact } from 'react-icons/fa';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
//https://react-icons.github.io/react-icons/
import sidebarBg from '../../assests/bg2.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBarQuizz = (props) => {
    const { image } = props;
    // const{handleToggleSidebar} = props;
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);
    const [tfReactIcon, settfReactIcon] = useState(true);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
        settfReactIcon(!tfReactIcon);
    };

    
    return (
        <>
            <ProSidebar
                // image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                // handleToggleSidebar={handleToggleSidebar}
                // handleCollapsedChange={handleCollapsedChange}
                
            >

                <SidebarHeader>
                    <Menu>

                        <MenuItem
                            onClick={handleCollapsedChange}
                            icon={collapsed ? <GoArrowRight /> : <GoArrowLeft />}
                        >
                            <div
                                style={{
                                    padding: "9px",
                                    // textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    letterSpacing: "1px"
                                }}
                            >
                                USER FORM
                            </div>
                        </MenuItem>


                    </Menu>
                    <Menu className={tfReactIcon ? 'reactIconFa' : ''}>
                        <MenuItem
                            icon={<FaReact color='rgb(18 199 241)' size={'2.5em'} />}>
                        </MenuItem>
                    </Menu>

                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape='square'>
                        <MenuItem icon={<FaTachometerAlt />} suffix={<span className="badge red" >New</span>}>
                             <Link to='/us' className='nav-link'>HOMEPAGE</Link>
                        </MenuItem>
                        <MenuItem icon={<FaGem />}> REACT JS </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">

                        <SubMenu icon={<FaRegLaughWink />} suffix={<span className="badge yellow">3</span>} title={'Manage'}>
                            <MenuItem>                            
                                <Link to='playgame' className='nav-link'>PLAY GAME</Link>
                            </MenuItem>                          
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <Menu>
                        <MenuItem>
                            <a
                                href="https://github.com/azouaoui-med/react-pro-sidebar"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer">
                                <FaGithub />
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    ViewSource
                                </span>
                            </a>
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBarQuizz;