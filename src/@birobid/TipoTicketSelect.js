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

export default function TipoTicketSelect(){
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [items,setItems] = React.useState([
        { label: "Cargando...", value: "" }
    ]);
    
    const [value, setValue] = React.useState("1");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    React.useEffect(()=>{
        async function getTipoTicket(){
            const serverapi = process.env.REACT_APP_SERVERAPI;
            //console.log(serverapi);
            const response = await fetch(serverapi +'/tipoticket');
            const body = await response.json();            
            //setItems(body.data.map(({ nombre_empresa,idempresa }) => ({ label: nombre_empresa, value: idempresa })));
            setItems(body.data.map(({ tipo,idtipo_ticket }) => ({ label: tipo, value: idtipo_ticket })));
            setLoading(false);
        }
        getTipoTicket();
    },[]);

    return (
        <FormControl className={classes.formControl} >
            <InputLabel id="tipoRequerimiento">Tipo Req.</InputLabel>
            <Select
                labelId="tipoRequerimiento"
                id="tipoRequerimiento-select"
                value={value}
                disabled={loading}
                onChange={handleChange}
                inputProps={{
                    name: 'tipoRequerimiento',
                    id: 'idtipo_ticket',
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