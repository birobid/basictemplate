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

export default function ContactoSelect(props){
    const { value, onChange } = props;
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [items,setItems] = React.useState([
        { label: "Cargando...", value: "Cargando" }
    ]);
    
    const dataSelect = props.dataSelect 
    console.log({"Data de Props" : dataSelect})   

    React.useEffect(()=>{
        setItems(dataSelect.map(({ nombre_contacto,idcontacto }) => ({ label: nombre_contacto, value: idcontacto })));
        setLoading(false);         
    },[]);

    return (
        <FormControl className={classes.formControl} >
            <InputLabel id="contactoInput">Contacto</InputLabel>
            <Select
                labelId="contactoInput"
                id="contacto"
                value={value}
                disabled={loading}
                onChange={onChange}
                inputProps={{
                    name: 'contacto',
                    id: 'idcontacto',
                }}
            >
            {
                items.map(({ label, value }) => (
                    <MenuItem key={value+value} value={value}>{label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    );
}