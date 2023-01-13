import React from 'react'
import 'src/views/users/AddNewUsers/AddNewUsers'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { userColumns, userRows } from 'src/datatablesource'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

const AllUsers = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users'),
      (snapShot) => {
        let list = []
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setData(list)
      },
      (error) => {
        console.log(error)
      },
    )

    return () => {
      unsub()
    }
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id))
      setData(data.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        DESK
        <Link to="/users/add-new-users" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default AllUsers
