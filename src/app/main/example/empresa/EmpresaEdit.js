import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React from 'react';

const columns = [
    {field: 'idempresa', headerName: 'ID', width : 50},
    {field: 'nombre_empresa', headerName: 'Nombre', width : 130},
    {field: 'representante', headerName: 'Representante', width : 130},
    {field: 'tlf_contacto', headerName: 'Tlf.Contacto', width : 130},
    {field: 'email', headerName: 'Email', width : 130},
    {field: 'password', headerName: 'Password', width : 130},
    {field: 'ruc', headerName: 'RUC', width : 150},
    {field: 'activo', headerName: 'Estado', width : 100},
];


const serverapi = process.env.REACT_APP_SERVERAPI;

export default function DataTable() {
    
    const [rowss,setItems] = React.useState([
        { id: 0 ,idempresa :0,nombre_empresa: "0", representante: "0",tlf_contacto:'...',email:'0',password:'0',ruc:'0',activo:'0' }
    ]);

    React.useEffect(()=>{
        axios.get(`${serverapi}/listarempresa`)
        .then(res=>{
            setItems(res.data.data);
        });
    },[]);
    return (    
      <div style={{ paddingTop:'1rem',paddingLeft:'1rem',height: '70vh', width: '99%' }}>
        <div style={{paddingTop:'1rem',paddingBottom:'2rem'}}><h2>Listado de Empresas</h2></div>
        <DataGrid rows={rowss} columns={columns} pageSize={6} getRowId={(rows) => rows.idempresa} />
      </div>
    );
}  

/* eslint-disable camelcase */
