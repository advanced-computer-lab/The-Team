import React, {useState, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import Axios from 'axios'

const columns = [
  {field: 'From', headerName: 'From',width: 300},
  {field: 'To', headerName: 'To', width: 300},
  {field: 'Flight_date', headerName: 'Flight_date', width: 200},
  {field: 'Economy_seats', headerName: 'Economy_seats', width: 200},
  {field: 'Business_seats', headerName: 'Business_seats', width: 200},
  {field: 'First_seats', headerName: 'First_seats', width: 200},
]

const DataTable = (props) => {


  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData(props.rows)
  })

  return (
    <div style={{height: 700, width: '100%'}}>
      <DataGrid 
       getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={12}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable
 
