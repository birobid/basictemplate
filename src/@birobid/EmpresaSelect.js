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

export default function EmpresaSelect(){
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
        async function getProvincias(){
            const serverapi = process.env.REACT_APP_SERVERAPI;
            const response = await fetch(serverapi + "/listarempresa");
            const body = await response.json();            
            setItems(body.data.map(({ nombre_empresa,idempresa }) => ({ label: nombre_empresa, value: idempresa })));
            setLoading(false);
        }
        getProvincias();
    },[]);

    return (
        <FormControl className={classes.formControl} >
            <InputLabel id="empresa-select">Empresa</InputLabel>
            <Select
                labelId="empresa-select"
                id="empresa"
                value={value}
                disabled={loading}
                onChange={handleChange} 
                inputProps={{
                    name: 'empresa',
                    id: 'empresa',
                }}
            >
            {
                items.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    );
}