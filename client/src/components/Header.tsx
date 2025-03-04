import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'
import { logoutRequest } from '../redux/actions/UserActions';

const iconPath = process.env.PUBLIC_URL

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const hundleLogOut = () => {
        dispatch(logoutRequest(navigate));
    }

    return (
        <div className="sticky-header">
            <button className="btn-logout" onClick={hundleLogOut}>
                <img src={`${iconPath}logout.svg`} alt="" />
                <span> Log out</span>
            </button>
        </div>
    )
}

export default Header;