import { FormControl } from '@material-ui/core';
import { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NumberFormat from 'react-number-format';

const serverapi = process.env.REACT_APP_SERVERAPI;
const useStyles = makeStyles({
	layoutRoot: {      
    },
    FormControl:{
        margin: '8px solid black',
        color:'pink'
    },
    formControl: {
        margin: 10,
        minWidth: 150,
      },
    selectEmpty: {
        marginTop: '10px',
    },
});
const formElement = {
    margin: '1rem',
};
const formElement2 = {
   minWidth : '300px',
   marginTop : '2rem'
};



function Requerimiento() {

	const classes = useStyles();
    const [loading, setLoading] = useState(true);   
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data,setData] = useState({        
        idempresa : 0,
        tipo : 0,
        contacto : 0,
        creado : new Date(),
        descripcion: ""
    })   
    
    function handle(e) {       
        setData({
            ...data,
            [e.target.name]: e.target.value            
        })
        //console.log(data)
    } 
    
    const [contactosList,setContactos] = useState([
        { label: "Cargando...", value: "Cargando" }
    ]);
    
    const [tipoTickerList,setTipoTicket] = useState([
        { label: "Cargando...", value: "Cargando" }
    ]);
    
    const [empresaList,setEmpresa] = useState([
        { label: "Cargando...", value: "Cargando" }
    ]);
    
    useEffect(()=>{         
        let ide = [] 
        async function getEmpresa() {
            axios.get(serverapi+"/listarempresa")
                .then(res => {                
                    let dataC = res.data                   
                    setEmpresa(dataC.data.map(({ nombre_empresa,idempresa }) => ({ label: nombre_empresa, value: idempresa })));
                    setLoading(false);
                    ide = Array.from(dataC.data) 
                }) 
                .then(res =>{
                    setData({
                        ...data,
                        ["idempresa"]: ide[0].idempresa
                    }) 
                })
        }       
        getEmpresa();        
    },[]);

    useEffect(()=>{  
        let setr = []             
        async function getTipoTicket() {
            axios.get(serverapi+"/tipoticket")
                .then(res => {                
                    let dataC = res.data
                    setTipoTicket(dataC.data.map(({ tipo,idtipo_ticket }) => ({ label: tipo, value: idtipo_ticket })));
                    setLoading(false);
                    setr = Array.from(dataC.data)    
                })
                .then(res =>{
                    setData({
                        ...data,
                        ["tipo"]: setr[0].idtipo_ticket
                    })   
                })
        }       
        getTipoTicket();  
           
    },[]);

    useEffect(()=>{ 
        let setr = []      
        async function getContactos() {
            axios.get(serverapi+"/listarcontacto")
                .then(res => {                
                    const dataC = res.data
                    setContactos(dataC.data.map(({ nombre_contacto,idcontacto }) => ({ label: nombre_contacto, value: idcontacto })));
                    setLoading(false);
                    setr = Array.from(dataC.data)
                }) 
                .then(res =>{
                    setData({
                        ...data,
                        ["contacto"]: setr[0].idcontacto
                    })
                })
        }       
        getContactos();
    },[]);

    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData({
            ...data,
            ["creado"]: date                      
        })
        console.log(date)
    };
    
    const onSubmit = function(e){        
        e.preventDefault()
        const dataForm = data

        try{            
            axios({
                url : serverapi + '/grabarticket',
                method : 'POST',
                data : dataForm                
            })
            .then((response) => {
                let dataResponse = response.data
                let numT = dataResponse.data[0].nticket
                if(numT != null){
                   
                    let message1 = 'Requerimiento número ' + numT + ' almacenado.'
                    alert(message1)
                    
                }
                
            }, (error) => {
                console.log(error);
            });
            
        }catch(err){
            console.log(err)
        }
    }  


   
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Requerimiento</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Formulario de Ingreso.</h4>
				</div>
			}
			content={
                <Grid container justify="space-around">
                   
                    <div className="p-24">
                        <form className = {classes.root} onSubmit={onSubmit} >
                            <div>
                                <FormControl className={classes.formControl} >
                                    <InputLabel id="empresainput">Empresa</InputLabel>
                                    <Select
                                        labelId="empresainput"
                                        id="idempresa"
                                        value={data.idempresa}
                                        disabled={loading}
                                        onChange={(e) => handle(e)}
                                        inputProps={{
                                            name: 'idempresa',
                                            id: 'idempresa',
                                        }}
                                    >
                                    {
                                        empresaList.map(({ label, value }) => (
                                            <MenuItem key={value+value} value={value}>{label}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                                
                                <FormControl className={classes.formControl} >
                                    <InputLabel id="tiporequerimiento">Tipo Requerimiento.</InputLabel>
                                    <Select
                                        labelId="tiporequerimiento"
                                        id="tipo"
                                        value={data.tipo}
                                        disabled={loading}
                                        onChange={(e) => handle(e)}
                                        inputProps={{
                                            name: 'tipo',
                                            id: 'tipo',
                                        }}
                                    >
                                    {
                                        tipoTickerList.map(({ label, value }) => (
                                            <MenuItem key={value+value} value={value}>{label}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl} >
                                    <InputLabel id="contactoInput">Contacto</InputLabel>
                                    <Select
                                        labelId="contactoInput"
                                        id="contacto"
                                        value={data.contacto}
                                        disabled={loading}
                                        onChange={(e) => handle(e)}
                                        inputProps={{
                                            name: 'contacto',
                                            id: 'contacto',
                                        }}
                                    >
                                    {
                                        contactosList.map(({ label, value }) => (
                                            <MenuItem key={value+value} value={value}>{label}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </div>
                            <div>                            
                                <FormControl style={formElement}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="creado"
                                        label="Fecha de Creación"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </FormControl>
                            </div>                    
                            <div>
                                <FormControl style={formElement2}>
                                    <TextField
                                        id="descripcion"
                                        name="descripcion"
                                        label="Descripción"
                                        multiline
                                        rows={4}                                        
                                        variant="outlined"
                                        value ={data.descripcion}
                                        onChange={(e) => handle(e)}
                                    />
                                </FormControl>
                            </div>     
                            <div className="p-10 flex flex-center">
                                <Button variant="contained" color="primary" type="submit">
                                    Guardar
                                </Button>    
                            </div>                                          
                        </form>
                    </div>
                </Grid>
			}
		/>
	);
}
export default Requerimiento;