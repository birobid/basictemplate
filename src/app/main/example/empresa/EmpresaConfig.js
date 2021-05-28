import i18next from 'i18next';
import Empresa from './Empresa';
import EmpresaEdit from './EmpresaEdit';


const EmpresaConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/addempresa',
			component: Empresa
		},
        {
            path: '/editempresa',
			component: EmpresaEdit
        }
	]
};

export default EmpresaConfig;