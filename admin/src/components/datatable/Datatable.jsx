import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from '../../hooks/useFetch'
import { useEffect } from "react";
import axios from 'axios'

const Datatable = ({ column }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list1, setList1] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList1(data);
  }, [data]);
  console.log(list1)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList1(list1.filter((item) => item._id !== id));
    } catch (err) { }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list1}
        columns={column.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;