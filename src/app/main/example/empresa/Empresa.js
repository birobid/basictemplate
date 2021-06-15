import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';

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
	const classes = useStyles();

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
                                <Input id="nombre_empresa" aria-describedby="my-helper-text1" />
                                <FormHelperText id="my-helper-text1">nombre principal</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="password">Contraseña</InputLabel>
                                <Input id="password" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">contraseña</FormHelperText>
                            </FormControl>
                        </div> 
                        <div>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="representante">Representante</InputLabel>
                                <Input id="representante" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">Nombre Representante</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">Email de la empresa</FormHelperText>
                            </FormControl>
                        </div> 
                        <div>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="ruc">RUC</InputLabel>
                                <Input id="ruc" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">contraseña</FormHelperText>
                            </FormControl>
                            <FormControl style={formElement}>
                                <InputLabel htmlFor="telefono">Teléfono</InputLabel>
                                <Input id="telefono" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">contraseña</FormHelperText>
                            </FormControl>
                        </div>     
                        <div className="p-10 flex flex-center">
                            <Button variant="contained" color="primary">
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
