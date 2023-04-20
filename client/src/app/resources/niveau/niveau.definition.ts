import { LinkType, ResourceDefinition, ActionType } from '@casejs/angular-library'

export const niveauDefinition: ResourceDefinition = {
  title: 'Niveaus',
  nameSingular: 'niveau',
  namePlural: 'niveaus',
  className: 'Niveau',
  mainIdentifier: 'id',
  slug: 'niveaus',
  path: 'niveaus',
  icon: 'icon-grid',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE, LinkType.EXPORT],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Modifier',
      permission: 'editNiveaus',
      action: (niveau) => ({
        type: ActionType.Link,
        link: {
          path: `${niveauDefinition.path}/${niveau.id}/edit`
        }
      })
    },
    {
      label: 'Supprimer',
      permission: 'deleteNiveaus',
      action: (niveau) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: niveau,
          definition: niveauDefinition
        }
      })
    }
  ]
}
