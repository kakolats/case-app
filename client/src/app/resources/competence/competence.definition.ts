import { LinkType, ResourceDefinition, ActionType } from '@casejs/angular-library'

export const competenceDefinition: ResourceDefinition = {
  title: 'Competences',
  nameSingular: 'competence',
  namePlural: 'competences',
  className: 'Competence',
  mainIdentifier: 'id',
  slug: 'competences',
  path: 'competences',
  icon: 'icon-grid',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE, LinkType.EXPORT],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Edit',
      permission: 'editCompetences',
      action: (competence) => ({
        type: ActionType.Link,
        link: {
          path: `${competenceDefinition.path}/${competence.id}/edit`
        }
      })
    },
    {
      label: 'Delete',
      permission: 'deleteCompetences',
      action: (competence) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: competence,
          definition: competenceDefinition
        }
      })
    }
  ]
}
