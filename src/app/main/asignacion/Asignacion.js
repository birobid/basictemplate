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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

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
    saveButon:{
        paddingLeft:10,
        marginLeft:20
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    
    const [emails,setEmail ]= useState([
        {email :'Cargando..', idOperador :0,nombre :'Cargando..',departamento:'...'}        
    ]); 

    useEffect(()=>{
        async function getOperador() {
            const urlFinal = `${serverapi}/listaroperador`;
            axios.get(urlFinal)
            .then(res => {                
                const dataC = res.data
                setEmail(dataC.data.map(({idoperador,nombre,email,departamento}) => ({ 
                        idOperador : idoperador,
                        email : email,
                        nombre : nombre,
                        departamento:departamento
                    })                    
                )); 
            })              
        } 
        getOperador()         
    },[]);

    
    const classes = useStyles();    
    const { onClose, selectedValue, open, ticketusando} = props;
  
    const handleClose = () => {      
      onClose(selectedValue,ticketusando);      
    };
  
    const handleListItemClick = (email,id,ticketusandol) => {      
        onClose(email,id,ticketusandol);
    };
  
    return (        
        <Dialog id={ticketusando} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle  >Operador para el Ticket {ticketusando}</DialogTitle>
        <List>        
          {emails.map((ope) => (
            <ListItem button onClick={() => handleListItemClick(ope.email,ope.idOperador,ticketusando)} key={ope.idOperador} tickettratado = {ticketusando} >
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                    <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <FuseAnimate
                animation="transition.slideUpIn"
                duration={400}
                delay={100}
                >
                  <ListItemText primary={`${ope.nombre.toUpperCase()}`}    />
                </FuseAnimate>
              
            </ListItem>
          ))} 
        
        </List>
      </Dialog>
      
    );
  }

function Asignacion() {

    const [open, setOpen] = useState(false);
    const [ticketActual,setTicket] = useState(0); //Setear el Ticket a manipular
    const [selectedValue, setSelectedValue] = useState([
        {
            email : '...',        
            idOperador :1,
            ticketNumber : 0
        }
    ]);

	const classes = useStyles();
    const [listTicket,setListTicket] = useState([
        { 
            idticket: 1, 
            nombre_empresa: "Cargando..", 
            tipo: 1, 
            nombreContacto: 1, 
            descripcion: "Cargando", 
            estado: 1, 
            creado: "01-01-2021", 
            operador: 0,
            opeNombre: '...'
        }
    ]);
        

    const hadleDoubleFuctions = function fun(props) {       
        setTicket(props)
        setOpen(true)
    }
       
    const handleClose = (value, id, ticket) => {
        setOpen(false);
        //setSelectedValue({ email : value, idOperador : id , ticketNumber : ticket });
        const newListTicket = listTicket.map((item) =>{
            if(item.idticket === ticket){
                const ticketUpdate = {
                    ...item,
                    operador: id,
                    opeNombre: value 
                };
                return ticketUpdate;
            }
            return item;            
        })    
        setListTicket(newListTicket)        
    };

    const handleSave = function fun(tk,ope){
        
        if(ope === 0){
            alert(`Debe asignar un Operador al ticket ${tk}`)
        }else{
            const urlupdate = `${serverapi}/actualizaticket`;
            const dataForm = {
                    idticket:tk,
                    operador:ope
            }  
            
            try{            
                axios({
                    url : urlupdate,
                    method : 'POST',
                    data : dataForm                
                })
                .then((response) => {

                    const dataResponse = response.data                    
                    const statust = dataResponse.status
                    if(statust === true){
                        const newListTicket = listTicket.filter((item) =>{
                            return item.idticket !== tk;            
                        })    
                        setListTicket(newListTicket)
                    }                
                }, (error) => {
                    console.log(error);
                });
                
            }catch(err){
                console.log(err)
            } 
        }
    }

    useEffect(()=>{  
        async function getTickets() {
            const urlFinal = `${serverapi}/listarticketpendientes`;
            axios.get(urlFinal)
            .then(res => {                
                const dataC = res.data 
                //Sacar Tickest ya asignados
                const newListTicket = dataC.data.filter((item) =>{
                    return item.operador === 0;            
                })                                     
                setListTicket(newListTicket.map(({idticket,nombre_empresa:nombreEmpresa,tipo,nombre_contacto:nombreContacto,descripcion,estado,creado,operador}) => ({ 
                        idticket : idticket,
                        nombre_empresa : nombreEmpresa,
                        tipo : tipo,
                        nombreContacto : nombreContacto,
                        descripcion : descripcion,
                        estado : estado,
                        creado : creado,
                        operador: operador
                    })                    
                )); 
            })              
        } 
        getTickets()   
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
					<h4>Tickets Disponibles</h4>
				</div>
			}
			content={                
                <Grid container justify="flex-start"> 
                    <SimpleDialog selectedValue={ selectedValue.idOperador } ticketusando={ticketActual} open={ open } onClose={ handleClose }/>
                  
                    {listTicket.map(tk => (  
                        <Card key={tk.idticket} className={classes.root} >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} >
                                {tk.idticket}
                            </Avatar>
                            }                    
                            title={tk.nombre_empresa}
                            subheader= {tk.creado}
                        />
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="/assets/images/etc/blue-back.png"
                            title={tk.nombreContacto}
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h6" component="h2">
                                    {tk.nombreContacto}
                                </Typography>   
                                    {tk.tipo}                                 
                                <div>                                     
                                    <Typography variant="subtitle2" > Operador: {tk.opeNombre} </Typography>
                                </div>

                                <FuseAnimate 
                                    animation={{
                                        translateX: [0, '100%'],
                                        opacity   : [1, 0]
                                    }}
                                    duration={400}
                                    delay={400}
                                >
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.cuerpo} >
                                        {tk.descripcion.substring(0,220)}
                                    </Typography>
                                </FuseAnimate>     
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" variant="contained" onClick={() => hadleDoubleFuctions(tk.idticket)} >
                                Asignar
                            </Button>
                            <IconButton color="primary" aria-label="Guardar" className={classes.saveButon}  onClick={() => handleSave(tk.idticket,tk.operador)}>
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
/* eslint-disable camelcase */