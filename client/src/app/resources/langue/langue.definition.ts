import { LinkType, ResourceDefinition, ActionType } from '@casejs/angular-library'

export const langueDefinition: ResourceDefinition = {
  title: 'Langues',
  nameSingular: 'langue',
  namePlural: 'langues',
  className: 'Langue',
  mainIdentifier: 'id',
  slug: 'langues',
  path: 'langues',
  icon: 'icon-grid',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE, LinkType.EXPORT],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Edit',
      permission: 'editLangues',
      action: (langue) => ({
        type: ActionType.Link,
        link: {
          path: `${langueDefinition.path}/${langue.id}/edit`
        }
      })
    },
    {
      label: 'Delete',
      permission: 'deleteLangues',
      action: (langue) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: langue,
          definition: langueDefinition
        }
      })
    }
  ]
}
