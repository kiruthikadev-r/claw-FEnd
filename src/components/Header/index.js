import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiLogout } from 'react-icons/ci';
import './index.css';

const Header = () => {
  const navigate = useNavigate();
  const role = Cookies.get('role');

  const clickToLogOut = () => {
    Cookies.remove('jwt_token');
    Cookies.remove('role');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="header-content-container">
      {role === 'admin' && (
          <li>
            <Link to="/add-product" className="link-item">
              <button className="list-item">Admin</button>
            </Link>
          </li>
        )}
        <li>
          <Link to="/" className="link-item">
            <button className="list-item">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link-item">
            <button className="list-item">Cart</button>
          </Link>
        </li>
        <li>
          <Link to="/orders" className="link-item">
            <button className="list-item">Orders</button>
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={clickToLogOut}>
            <CiLogout size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
