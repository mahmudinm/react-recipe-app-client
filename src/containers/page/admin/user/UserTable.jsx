import React from 'react'
import Table from "components/ReactTable/Table"
import { Button } from 'reactstrap';

export default function UserTable({ users, handleModalEdit, deleteUser }) {

  const columns = React.useMemo(
    () => [ 
      {
        Header: 'Name',
        accessor: 'name',
        disableFilters: true
      },
      {
        Header: 'Action',
        disableFilters: true,
        Cell: ({row}) => (
          <div>
             <Button onClick={() => handleModalEdit(row.original.id)} color="primary" size="sm" >Edit</Button>
             <button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteUser(row.original.id) }} className="btn btn-sm btn-danger">Delete</button>
          </div>
        )
      }
    ],
    [handleModalEdit, deleteUser]
  )

  return (
    <React.Fragment>
      <Table columns={columns} data={users} />
    </React.Fragment>
  )
}