import { FormControl } from '@material-ui/core';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import EmpresaSelect from '@birobid/EmpresaSelect';
import TipoTicketSelect from '@birobid/TipoTicketSelect';
import ContactoSelect from '@birobid/ContactoSelect';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

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

const formElement2 = {
   minWidth : '300px',
   marginTop : '2rem'
};

function Requerimiento() {
	const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    
    const onSubmit = function(){
        
    }

    const [data,setData] = useState({        
        empresa : "",
        idtipo_ticket : "",
        contacto : "",
        creado : "",
        descripcion: ""
    })

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
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
                                <EmpresaSelect 
                                    onChange={(e) => handle(e)} 
                                    id="empresa" 
                                    value={data.empresa} 
                                    name = "empresa"
                                />
                                <TipoTicketSelect
                                    onChange={(e) => handle(e)}
                                    value={data.idtipo_ticket} 
                                    id="idtipo_ticket"
                                    name = "idtipo_ticket"
                                />
                                <ContactoSelect/>
                            </div>
                            <div>                            
                                <FormControl style={formElement}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="fecha_creacion"
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
