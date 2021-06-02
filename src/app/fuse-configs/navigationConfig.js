import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'soporte-tickets',
		title: 'Soportes',
		translate: 'Soportes',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'ticket',
				title: 'Ticket',
				translate: 'Ticket',
				type: 'item',
				icon: 'style',
				url: '/example'
			}			
		]
	},
	{
		id: 'req',
		title: 'Requerimiento',
		translate: 'Requerimiento',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'addreq',
				title: 'add',
				translate: 'Crear',
				type: 'item',
				icon: 'dashboard',
				url: '/addrequerimiento'
			},
			{
				id: 'asign',
				title: 'asignar',
				translate: 'Asignar',
				type: 'item',
				icon: 'dashboard',
				url: '/example'
			}			
		]
	},
	{
		id: 'mantenimientos',
		title: 'mantenimientos',
		translate: 'MANTENIMIENTOS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id       : 'empresa',
				title    : 'Empresa',
				type     : 'collapse',
				icon    : 'airplay',
				children : [
					{
						id   : 'addempresa',
						title: 'Añadir Empresa',
						type : 'item',
						url  : '/addempresa'
					},
					{
						id   : 'modempresa',
						title: 'Modificar Empresa',
						type : 'item',
						url  : '/editempresa'
					}
				]
			}					
		]
	},	
];

export default navigationConfig;
