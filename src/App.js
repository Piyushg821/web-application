import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './style/dark.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AddEditUser = React.lazy(() => import('./views/pages/AddEditUser'))
const AllUsers = React.lazy(() => import('./views/pages/AllUsers/AllUsers'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/add" name="Add User" element={<AddEditUser />} />
            <Route exact path="/update/:id" name="Edit User" element={<AddEditUser />} />{' '}
            <Route exact path="/update/:id" name="Edit User" element={<AddEditUser />} />
            <Route exact path="/all" name="All Users" element={<AllUsers />} />{' '}
            <Route exact path="/update/:id" name="Edit User" element={<AddEditUser />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
