import Requerimiento from './Requerimiento';

const RequerimientoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/addrequerimiento',
			component: Requerimiento
		}       
	]
};

export default RequerimientoConfig;