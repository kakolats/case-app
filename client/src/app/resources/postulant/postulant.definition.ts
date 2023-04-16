import { LinkType, ResourceDefinition, ActionType } from '@casejs/angular-library'

export const postulantDefinition: ResourceDefinition = {
  title: 'Postulants',
  nameSingular: 'postulant',
  namePlural: 'postulants',
  className: 'Postulant',
  mainIdentifier: 'id',
  slug: 'postulants',
  path: 'postulants',
  icon: 'icon-grid',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE, LinkType.EXPORT],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Edit',
      permission: 'editPostulants',
      action: (postulant) => ({
        type: ActionType.Link,
        link: {
          path: `${postulantDefinition.path}/${postulant.id}/edit`
        }
      })
    },
    {
      label: 'Delete',
      permission: 'deletePostulants',
      action: (postulant) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: postulant,
          definition: postulantDefinition
        }
      })
    }
  ]
}
