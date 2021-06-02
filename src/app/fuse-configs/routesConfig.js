import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import EmpresaConfig from 'app/main/example/empresa/EmpresaConfig'
import RequerimientoConfig from 'app/main/example/requerimiento/RequerimientoConfig'

const routeConfigs = [EmpresaConfig,RequerimientoConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />,
	
	},
	{
		path:'/addempresa',
		component: ()=><Redirect to="/addempresa"/>
	},
	{
		path:'/editempresa',
		component: ()=><Redirect to="/editempresa"/>
	},
	{
		path:'/addrequerimiento',
		component: ()=><Redirect to="/addrequerimiento"/>
	}

];

export default routes;
