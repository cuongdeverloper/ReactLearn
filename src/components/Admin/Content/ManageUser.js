import ModalManageUser from "./ModalManageUser";
import './ManageUser.scss';
const ManageUser = (props) => {
    return (
        <div className='ManageUser-container'>
            <div className='Manageuser-header'>
                ManagerUser

            </div>

            <div className='Manageuser-content'>
                <div>
                    <button>Add new users</button>
                </div>

                <div>
                    <ModalManageUser />
                    {/* ReactBoostrap Modal */}
                </div>

            </div>
        </div>
    );
}
export default ManageUser;