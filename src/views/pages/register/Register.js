import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
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
  const history = useNavigate()

  const [data, setData] = useState([])

  const addData = (e) => {
    e.preventDefault()

    const { username, email, password } = inpval
    localStorage.setItem('register', JSON.stringify([...data, inpval]))
    alert('Registration Successful')
    history('/login')
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm id="registration-form">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="username" onChange={getdata} placeholder="Username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput name="email" onChange={getdata} placeholder="Email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      onChange={getdata}
                      type="password"
                      placeholder="Password"
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" onClick={addData} color="success">
                      Create
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
