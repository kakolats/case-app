import { DataSource } from 'typeorm'

import { Competence } from '../../resources/competence/competence.entity'

export class CompetenceSeeder {
  dataSource: DataSource
  count: number

  constructor(dataSource: DataSource, count: number) {
    this.dataSource = dataSource
    this.count = count
  }

  async seed(): Promise<Competence[]> {
    console.log('\x1b[35m', '[] Seeding competences...')

    const properties: string[] = this.dataSource
      .getMetadata(Competence)
      .ownColumns.map((column) => column.propertyName)

    const saveCompetencePromises: Promise<Competence>[] = Array.from(Array(this.count)).map(
      async (_value, index: number) => {
        return this.dataSource.manager.save(await this.new(properties, index))
      }
    )

    return Promise.all(saveCompetencePromises).then((res) => {
      return res
    })
  }

  private new(properties: string[], index): Promise<Competence> {
    const competenceModel = this.dataSource.manager.create(Competence, {})

    properties.forEach((property: string) => {
      const seederFunction = Reflect.getMetadata(`${property}:seed`, competenceModel)
      if (seederFunction) {
        competenceModel[property] = seederFunction(index)
      }
    })

    return Promise.resolve(competenceModel)
  }
}
