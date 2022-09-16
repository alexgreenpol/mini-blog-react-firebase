import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { setUser } from './redux/auth/authActions'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import HomePage from './pages/HomePage/HomePage'
import Header from './components/Header/Header'
import AdminPage from './pages/AdminPage/AdminPage'
import EditArticlePage from './pages/EditArticlePage/EditArticlePage'
import AddArticlePage from './pages/AddArticlePage/AddArticlePage'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import SingleArticlePage from './pages/SingleArticlePage/SingleArticlePage'

function App({ isDarkmode, dispatchSetUser }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          id: user.uid,
          email: user.email,
          token: user.accessToken
        }

        dispatchSetUser(userData)
      }

      setLoading(false)
    })
  }, [dispatchSetUser])

  if (!loading) {
    return (
      <div className={isDarkmode ? 'dark-theme' : 'light-theme'}>
        <Header />
        <div className="page">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />}>
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="add-article" element={<AddArticlePage />} />
              <Route path="edit-article/:id" element={<EditArticlePage />} />
            </Route>
            <Route path="/article/:id" element={<SingleArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDarkmode: state.darkmode.isDarkmode
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (userData) => dispatch(setUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
