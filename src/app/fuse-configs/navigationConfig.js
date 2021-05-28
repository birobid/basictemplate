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
		title: 'soporte',
		translate: 'Soporte',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'ticket-component',
				title: 'Tickes',
				translate: 'Tickes',
				type: 'item',
				icon: 'style',
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
				icon    : 'dashboard',
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
