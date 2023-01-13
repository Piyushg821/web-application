import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const getdata = (e) => {
    //console.log(e.target.value)
    const { value, name } = e.target
    //console.log(value, name)
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      }
    })
  }
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const addData = (e) => {
    e.preventDefault()

    const getuserArr = localStorage.getItem('register')
    console.log(getuserArr)
    const { email, password } = inpval

    if (getuserArr && getuserArr.length) {
      const userdata = JSON.parse(getuserArr)
      const userlogin = userdata.filter((el, k) => {
        return el.email === email && el.password === password
      })
      if (userlogin.length === 0) {
        alert('Invalid details')
      } else {
        alert('User Login Successfully')
        navigate('/users/add-new-users')
      }
    }

    localStorage.setItem('register', JSON.stringify([...data, inpval]))
  }

  const [inpval, setInpval] = useState({
    username: '',
    email: '',
    password: '',
  })
  console.log(inpval)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm id="login-form">
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        onChange={getdata}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={getdata}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="secondary" type="submit" onClick={addData} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton style={{ textDecoration: 'none' }} color="black" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>The best offer for your business</p>
                    <Link to="/register">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
