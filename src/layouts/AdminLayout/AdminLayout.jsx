import { Outlet, NavLink } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="page page--with-sidebar">
      <div className="page__sidebar">
        <nav className="page-menu">
          <NavLink to="articles" className="page-menu__link">
            My Articles
          </NavLink>
          <NavLink to="add-article" className="page-menu__link">
            New Article
          </NavLink>
        </nav>
      </div>
      <div className="page__content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
