import { MenuItem } from '@casejs/angular-library'

export const menuItems: MenuItem[] = [
{"label":"Postulants","permissionsOr":["browsePostulants","browseOwnPostulants"],"routePath":"/postulants","icon":"icon-grid","items":[]},

  {
    label: 'Users',
    permissionsOr: ['browseUsers', 'browseRoles'],
    icon: 'icon-user',
    items: [
      {
        label: 'Users',
        permissionsOr: ['browseUsers'],
        routePath: '/users'
      },
      {
        label: 'Roles',
        permissionsOr: ['browseRoles'],
        routePath: '/roles'
      }
    ]
  }
]
