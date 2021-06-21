import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';


const serverapi = process.env.REACT_APP_SERVERAPI;

const useStyles = makeStyles({
	layoutRoot: {
       
    },
    FormControl:{
        margin: '8px solid black',
        color:'pink'
    }

});
const formElement = {
    margin: '1rem',
};

function EmpresaForm() {
    const dispatch = useDispatch();
	const classes = useStyles();
    const [data,setData] = useState(
        {
            nombre: "",
            password : "",
            ruc : "",
            representante : "",
            email : "",
            contacto : ""
        }
    )

    function handle(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value          
        })        
    } 

    const handleNumber = (e,maxlng) => {
        const value = e.target.value.replace(/\D/g, "");
        setData({
            ...data,
            [e.target.name]: value.substring(0,maxlng)          
        })
    };

    function handleSave(){
        const dataForm = data
        try{            
            axios({
                url : `${serverapi}/grabaempresa`,
                method : 'POST',
                data : dataForm                
            })
            .then((response) => {
                const dataResponse = response.data                    
                const statust = dataResponse.status
                if(statust === true){
                    setData({
                        nombre: "",
                        password : "",
                        ruc : "",
                        representante : "",
                        email : "",
                        contacto : ""
                    })                   
                   dispatch(showMessage({ 
                        message: 'Empresa Registrada con exito.',
                        variant:'success',
                        autoHideDuration:2000,
                        anchorOrigin: {
                            vertical  : 'bottom',//top bottom
                            horizontal: 'center'//left center right
                        },
                    }));
                }                       
            }, (error) => {
                dispatch(showMessage({ 
                    message: 'Inconveniente al Registrar empresa. Causa: ' + error.message,
                    variant:'error' 
                }));
            });
            
        }catch(err){
            
        }
    }
    
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Creación de Empresas</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Formulario de creación de Empresa.</h4>
				</div>
			}
			content={
				<div className="p-24">
                    <form className = {classes.root}>
                        <div>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="nombre_empresa">Nombre de Empresa</InputLabel>
                                <Input 
                                    // onClick={setOpenNoti(true)}
                                    id="nombre_empresa" 
                                    name="nombre"
                                    type="text"
                                    aria-describedby="my-helper-text1" 
                                    inputProps = {{maxLength:80}}
                                    value={data.nombre} 
                                    onChange={(e) => handle(e)}
                                />
                                <FormHelperText id="my-helper-text1">nombre principal</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="contrasenaE">Contraseña</InputLabel>
                                <Input 
                                    id="contrasenaE" 
                                    name="password"
                                    type="password"
                                    inputProps = {{maxLength:80}}
                                    aria-describedby="Seguridad" 
                                    value={data.password} 
                                    onChange={(e) => handle(e)}
                                    />
                                <FormHelperText id="es un password">contraseña</FormHelperText>
                            </FormControl>
                        </div> 
                        <div>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="representante">Representante</InputLabel>
                                <Input 
                                    id="representante" 
                                    name="representante"
                                    aria-describedby="my-helper-text" 
                                    inputProps = {{maxLength:80}} 
                                    value={data.representante}
                                    onChange={(e) => handle(e)}
                                />
                                <FormHelperText id="my-helper-text">Nombre Representante</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input 
                                    id="email" 
                                    name="email"
                                    inputProps = {{maxLength:80}}
                                    aria-describedby="my-helper-text" 
                                    value={data.email} 
                                    onChange={(e) => handle(e)}                                    
                                />
                                <FormHelperText id="my-helper-text">Email de la empresa</FormHelperText>
                            </FormControl>
                        </div> 
                        <div>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="ruc">RUC</InputLabel>
                                <Input 
                                    id="ruc" 
                                    name = "ruc"                                                                        
                                    aria-describedby="my-helper-text" 
                                    value={data.ruc}                                    
                                    onChange={(e) => handleNumber(e,13)}                                     
                                />
                                <FormHelperText id="my-helper-text">RUC</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="telefono">Teléfono</InputLabel>
                                <Input 
                                    id="telefono" 
                                    name="contacto"                                                                       
                                    aria-describedby="my-helper-text" 
                                    value={data.contacto} 
                                    onChange={(e) => handleNumber(e,10)}                                    
                                />
                                <FormHelperText id="my-helper-text">Teléfono</FormHelperText>
                            </FormControl>
                        </div>     
                        <div className="p-10 flex flex-center">
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={handleSave}
                            >
                            Guardar
                            </Button>    
                        </div>                                          
                    </form> 
				</div>
			}
		/>
	);
}

export default EmpresaForm;
