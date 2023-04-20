import { Langue } from './../resources/langue/langue.entity'
import { Niveau } from './../resources/niveau/niveau.entity'
import { Competence } from './../resources/competence/competence.entity'
import { Postulant } from './../resources/postulant/postulant.entity'
import { SearchResult } from '@casejs/nest-library'
import { Injectable } from '@nestjs/common'
import {
  Brackets,
  DataSource,
  SelectQueryBuilder,
  WhereExpressionBuilder
} from 'typeorm'

import { Role } from '../resources/case/role.entity'
import { User } from '../resources/user/user.entity'

@Injectable()
export class SearchService {
  constructor(private dataSource: DataSource) {}

  // Main search function : searches terms on several pre-defined fields of several resources.
  async search({
    terms,
    resources
  }: {
    terms: string
    resources: string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    if (!terms || !resources || !resources.length) {
      return Promise.resolve([])
    }

    // * Search resources (keep comment for schematics).
if (
        resources.includes(Langue.name) &&
        Langue.searchableFields &&
        Langue.searchableFields.length
      ) {
        const langues: SearchResult[] = await this.searchResource(Langue, terms)
        searchResults = [...searchResults, ...langues]
      }
if (
        resources.includes(Niveau.name) &&
        Niveau.searchableFields &&
        Niveau.searchableFields.length
      ) {
        const niveaus: SearchResult[] = await this.searchResource(Niveau, terms)
        searchResults = [...searchResults, ...niveaus]
      }
if (
        resources.includes(Competence.name) &&
        Competence.searchableFields &&
        Competence.searchableFields.length
      ) {
        const competences: SearchResult[] = await this.searchResource(Competence, terms)
        searchResults = [...searchResults, ...competences]
      }
if (
        resources.includes(Postulant.name) &&
        Postulant.searchableFields &&
        Postulant.searchableFields.length
      ) {
        const postulants: SearchResult[] = await this.searchResource(Postulant, terms)
        searchResults = [...searchResults, ...postulants]
      }
    if (
      resources.includes(User.name) &&
      User.searchableFields &&
      User.searchableFields.length
    ) {
      const users: SearchResult[] = await this.searchResource(User, terms)
      searchResults = [...searchResults, ...users]
    }

    if (
      resources.includes(Role.name) &&
      Role.searchableFields &&
      Role.searchableFields.length
    ) {
      const roles: SearchResult[] = await this.searchResource(Role, terms)
      searchResults = [...searchResults, ...roles]
    }

    return searchResults
  }

  // Get full SearchResult object based on resource Ids. Used to display selection.
  async getSearchResultObjects(query: {
    [key: string]: string | string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    // * Get search result objects (keep comment for schematics).
if (query.langueIds && query.langueIds.length || query.langueId) {
        const langues: SearchResult[] = await this.getSearchResultObjectsForResource(
          Langue,
          query.langueIds || query.langueId
        )
        searchResults = [...searchResults, ...langues]
      }
if (query.niveauIds && query.niveauIds.length || query.niveauId) {
        const niveaus: SearchResult[] = await this.getSearchResultObjectsForResource(
          Niveau,
          query.niveauIds || query.niveauId
        )
        searchResults = [...searchResults, ...niveaus]
      }
if (query.competenceIds && query.competenceIds.length || query.competenceId) {
        const competences: SearchResult[] = await this.getSearchResultObjectsForResource(
          Competence,
          query.competenceIds || query.competenceId
        )
        searchResults = [...searchResults, ...competences]
      }
if (query.postulantIds && query.postulantIds.length || query.postulantId) {
        const postulants: SearchResult[] = await this.getSearchResultObjectsForResource(
          Postulant,
          query.postulantIds || query.postulantId
        )
        searchResults = [...searchResults, ...postulants]
      }
    if (query.userIds && query.userIds.length) {
      const users: SearchResult[] =
        await this.getSearchResultObjectsForResource(User, query.userIds)
      searchResults = [...searchResults, ...users]
    }
    if (query.roleIds && query.roleIds.length) {
      const roles: SearchResult[] =
        await this.getSearchResultObjectsForResource(Role, query.roleIds)
      searchResults = [...searchResults, ...roles]
    }

    return searchResults
  }

  private async searchResource(
    resourceClass: any,
    terms: string
  ): Promise<SearchResult[]> {
    const query: SelectQueryBuilder<any> = this.dataSource
      .getRepository(resourceClass)
      .createQueryBuilder('resource')
      // Search through all searchableFields.
      .andWhere(
        new Brackets((qb) => {
          resourceClass.searchableFields.reduce(
            (qb: WhereExpressionBuilder, searchableField: string) =>
              qb.orWhere(`resource.${searchableField} like :terms`, {
                terms: `%${terms}%`
              }),
            qb
          )
        })
      )

    const resources: any[] = await query.limit(50).getMany()

    return resources.map((resource: any) => ({
      id: resource.id,
      label: resource[resourceClass.displayName],
      resourceName: resourceClass.name
    }))
  }

  private async getSearchResultObjectsForResource(
    resourceClass: any,
    ids: string | string[]
  ): Promise<SearchResult[]> {
    const resources: any[] = await this.dataSource
      .getRepository(resourceClass)
      .createQueryBuilder('resource')
      .whereInIds(ids)
      .getMany()

    return resources.map((resource: User) => ({
      id: resource.id,
      label: resource[resourceClass.displayName],
      resourceName: resourceClass.name
    }))
  }
}
