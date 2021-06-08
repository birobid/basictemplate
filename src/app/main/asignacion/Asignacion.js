import { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import FuseMessage  from '@fuse/core/FuseMessage';

const serverapi = process.env.REACT_APP_SERVERAPI;

const useStyles = makeStyles({
	root: {
        maxWidth: 300,
        minWidth: 300,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        elevation: 2
        
    },
      media: {
        height: 80,
    },
    cuerpo:{
        minHeight:80,
        maxHeight:80
    },
    avatar: {
        backgroundColor: '#921111',
    }, 
    saveButon:{
        paddingLeft:10,
        marginLeft:20
    }  
});



function Asignacion() {

    const dispatch = useDispatch()
	const classes = useStyles();
    const [listTicket,setListTicket] = useState([
        { 
            idticket: 0, 
            nombre_empresa: "....", 
            tipo: 1, 
            nombre_contacto: 1, 
            descripcion: "...", 
            estado: 1, 
            creado: "01-01-2021", 
        }
    ]);
    
    useEffect(()=>{  
        async function getTickets() {
            axios.get(serverapi+"/listarticketpendientes")
            .then(res => {                
                const dataC = res.data 
                console.log(res.data)                 
                setListTicket(dataC.data.map(({idticket,nombre_empresa,tipo,nombre_contacto,descripcion,estado,creado}) => ({ 
                        idticket : idticket,
                        nombre_empresa : nombre_empresa,
                        tipo : tipo,
                        nombre_contacto : nombre_contacto,
                        descripcion : descripcion,
                        estado : estado,
                        creado : creado
                    })                    
                ));
            }) 
                
        }       
        getTickets();               
    },[]);


	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Asignación de Tickets</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Tickest Disponibles</h4>
				</div>
			}
			content={
                <Grid container justify="flex-start"> 

                    {listTicket.map(e => (           
                        
                        <Card key={e.idticket} className={classes.root}     >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {e.idticket}
                            </Avatar>
                            }
                    
                            title={e.nombre_empresa}
                            subheader= {e.creado}
                        />
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="/assets/images/etc/blue-back.png"
                            title={e.nombre_contacto}
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h6" component="h2">
                                    {e.nombre_contacto}
                                </Typography>
                                    {e.tipo}                                  
                                <FuseAnimate 
                                    animation={{
                                        translateX: [0, '100%'],
                                        opacity   : [1, 0]
                                    }}
                                    duration={400}
                                    delay={400}
                                >
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cuerpo} >
                                        {e.descripcion.substring(0,220)}
                                    </Typography>
                                </FuseAnimate>     
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" variant="contained">
                                Asignar
                            </Button>
                            <IconButton color="primary" aria-label="Guardar" className={classes.saveButon}>
                                <SaveIcon />
                            </IconButton>
                        </CardActions>
                        </Card>      
                                         
                        
                    ))
                    }  
                                                         
                </Grid>
			}
		/>
	);
}
export default Asignacion;