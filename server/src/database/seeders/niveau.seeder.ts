import { DataSource } from 'typeorm'

import { Niveau } from '../../resources/niveau/niveau.entity'

export class NiveauSeeder {
  dataSource: DataSource
  count: number

  constructor(dataSource: DataSource, count: number) {
    this.dataSource = dataSource
    this.count = count
  }

  async seed(): Promise<Niveau[]> {
    console.log('\x1b[35m', '[] Seeding niveaus...')

    const properties: string[] = this.dataSource
      .getMetadata(Niveau)
      .ownColumns.map((column) => column.propertyName)

    const saveNiveauPromises: Promise<Niveau>[] = Array.from(Array(this.count)).map(
      async (_value, index: number) => {
        return this.dataSource.manager.save(await this.new(properties, index))
      }
    )

    return Promise.all(saveNiveauPromises).then((res) => {
      return res
    })
  }

  private new(properties: string[], index): Promise<Niveau> {
    const niveauModel = this.dataSource.manager.create(Niveau, {})

    properties.forEach((property: string) => {
      const seederFunction = Reflect.getMetadata(`${property}:seed`, niveauModel)
      if (seederFunction) {
        niveauModel[property] = seederFunction(index)
      }
    })

    return Promise.resolve(niveauModel)
  }
}
