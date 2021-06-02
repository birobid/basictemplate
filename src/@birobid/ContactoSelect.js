import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: 10,
      minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(3),
      },
  }));

export default function ContactoSelect(){
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [items,setItems] = React.useState([
        { label: "Cargando...", value: "" }
    ]);
    
    const [value, setValue] = React.useState("1");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const contac = [
        {
            idcontacto:1,
            nombre_contacto:'Manuel Rangel',
            email_contacto:'salvatorex89@gmail.com',
            tlf_contacto: '0962749784',
            cargo:'Desarrollador',
            empresa:1
        },
        {
            idcontacto:2,
            nombre_contacto:'Maria Andrade',
            email_contacto:'marandrade@gmail.com',
            tlf_contacto: '0962749784',
            cargo:'Empleada',
            empresa:3
        },
        {
            idcontacto:3,
            nombre_contacto:'Camilo Terán',
            email_contacto:'cteran@gmail.com',
            tlf_contacto: '0962749784',
            cargo:'Vendedor',
            empresa:3
        }
    ]

    React.useEffect(()=>{
        async function getContacto(){
            const serverapi = process.env.REACT_APP_SERVERAPI;
            //console.log(serverapi);
            //const response = await fetch(serverapi +'/tipoticket');
            //const body = await response.json();            
            setItems(contac.map(({ nombre_contacto,idcontacto }) => ({ label: nombre_contacto, value: idcontacto })));
            //setItems(body.data.map(({ tipo,idtipo_ticket }) => ({ label: tipo, value: idtipo_ticket })));
            setLoading(false);
        }
        getContacto();
        
    },[]);

    return (
        <FormControl className={classes.formControl} >
            <InputLabel id="contactoInput">Contacto</InputLabel>
            <Select
                labelId="contactoInput"
                id="contacto"
                value={value}
                disabled={loading}
                onChange={handleChange}
                inputProps={{
                    name: 'contacto',
                    id: 'idcontacto',
                }}
            >
            {
                items.map(({ label, value }) => (
                    <MenuItem key={value+label} value={value}>{label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    );
}