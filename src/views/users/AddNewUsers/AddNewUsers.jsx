import React, { useState, useEffect } from 'react'
import { storage, db } from 'src/firebase'
import { useParams, useNavigate } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { doc, getDoc } from 'firebase/firestore'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
  MDBFile,
} from 'mdb-react-ui-kit'
import { uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const initialState = {
  username: '',
  email: '',
  password: '',
  games: '',
}

const AddNewUsers = () => {
  const [data, setData] = useState(initialState)
  const { username, password, email, games } = data
  const [file, setFile] = useState()
  const [progress, setProgress] = useState()
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    id && getSingleUser()
  }, [id])
  const getSingleUser = async () => {
    const docRef = doc(db, 'users', id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setData({ ...snapshot.data() })
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'users'), {
      ...data,
      timestamp: serverTimestamp(),
    })
    console.log(data)
    alert('user added successfully')
    navigate('/')
  }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name

      console.log(name)
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }))
          })
        },
      )
    }
    file && uploadFile()
  }, [file])
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody className="px-4">
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    name="username"
                    size="lg"
                    id="form1"
                    type="text"
                    value={username}
                    onChange={handleChange}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    name="email"
                    size="lg"
                    id="form2"
                    type="email"
                    value={email}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    name="password"
                    label="Password"
                    size="lg"
                    id="form3"
                    type="password"
                    value={password}
                    onChange={handleChange}
                  />
                </MDBCol>

                <MDBCol md="6" className="mb-4">
                  <h6 className="fw-bold">Games: </h6>
                  <MDBRadio
                    name="games"
                    id="Fantasy"
                    value="Fantasy"
                    checked={data.games === 'Fantasy'}
                    label="Fantasy"
                    inline
                    onChange={handleChange}
                  />
                  <MDBRadio
                    name="games"
                    id="Casino"
                    value="Casino"
                    checked={data.games === 'Casino'}
                    label="Casino"
                    inline
                    onChange={handleChange}
                  />
                  <MDBRadio
                    name="games"
                    id="Fantasy & Casino"
                    checked={data.games === 'Fantasy & Casino'}
                    value="Fantasy & Casino"
                    label="Fantasy & Casino"
                    inline
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBFile
                    size="lg"
                    id="customFile"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="small text-muted mt-2">Upload your Image.</div>
                </MDBCol>
              </MDBRow>

              <MDBBtn
                className="mb-4"
                size="lg"
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  )
}

export default AddNewUsers
