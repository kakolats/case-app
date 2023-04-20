import { MenuItem } from '@casejs/angular-library'

export const menuItems: MenuItem[] = [
{"label":"Langues","permissionsOr":["browseLangues","browseOwnLangues"],"routePath":"/langues","icon":"icon-grid","items":[]},

{"label":"Niveaux","permissionsOr":["browseNiveaus","browseOwnNiveaus"],"routePath":"/niveaus","icon":"icon-grid","items":[]},

{"label":"Competences","permissionsOr":["browseCompetences","browseOwnCompetences"],"routePath":"/competences","icon":"icon-grid","items":[]},

{"label":"Postulants","permissionsOr":["browsePostulants","browseOwnPostulants"],"routePath":"/postulants","icon":"icon-grid","items":[]},

  {
    label: 'Utilisateurs',
    permissionsOr: ['browseUsers', 'browseRoles'],
    icon: 'icon-user',
    items: [
      {
        label: 'Utilisateurs',
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
