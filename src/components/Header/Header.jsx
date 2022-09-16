import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useAuth } from '../../hooks/use-auth'
import { logoutUser } from '../../redux/auth/authActions'
import { turnOnDarkmode, turnOffDarkmode } from '../../redux/darkmode/darkmodeActions'
import mainLogo from '../../assets/images/logo.svg'
import './Header.scss'

function Header({ dispatchLogoutUser, dispatchTurnOffDarkmode, dispatchTurnOnDarkmode }) {
  const { isAuth } = useAuth()

  const handleLogout = () => {
    dispatchLogoutUser()
  }

  const handleDarkmod = (e) => {
    if (e.target.checked) {
      dispatchTurnOnDarkmode()
    } else {
      dispatchTurnOffDarkmode()
    }
  }

  return (
    <header className="app-header">
      {isAuth}
      <div className="app-header__col">
        <div className="logo">
          <img src={mainLogo} className="logo__img" alt="Si 14 Blog" />
          <span className="logo__title">Siblog</span>
        </div>
      </div>
      <div className="app-header__col">
        <nav className={isAuth ? 'menu' : 'hidden'}>
          <ul className="menu__list">
            <li className="menu__list-item">
              <Link className="menu__list-link" to="/">
                Home
              </Link>
            </li>
            <li className="menu__list-item">
              <Link className="menu__list-link" to="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={isAuth ? 'hidden' : 'menu'}>
          <ul className="menu__list">
            <li className="menu__list-item">
              <Link className="menu__list-link" to="/registration">
                Registration
              </Link>
            </li>
            <li className="menu__list-item">
              <Link className="menu__list-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="app-header__col">
        <div className="mode">
          <span>Light</span>
          <input type="checkbox" onChange={handleDarkmod} />
          <span>Dark</span>
        </div>
        <button type="button" className={!isAuth ? 'hidden' : 'btn btn--primary'} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  dispatchLogoutUser: PropTypes.func.isRequired,
  dispatchTurnOffDarkmode: PropTypes.func.isRequired,
  dispatchTurnOnDarkmode: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTurnOnDarkmode: () => dispatch(turnOnDarkmode()),
  dispatchTurnOffDarkmode: () => dispatch(turnOffDarkmode()),
  dispatchLogoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(Header)
