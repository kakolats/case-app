import { DataSource } from 'typeorm'

import { Langue } from '../../resources/langue/langue.entity'

export class LangueSeeder {
  dataSource: DataSource
  count: number

  constructor(dataSource: DataSource, count: number) {
    this.dataSource = dataSource
    this.count = count
  }

  async seed(): Promise<Langue[]> {
    console.log('\x1b[35m', '[] Seeding langues...')

    const properties: string[] = this.dataSource
      .getMetadata(Langue)
      .ownColumns.map((column) => column.propertyName)

    const saveLanguePromises: Promise<Langue>[] = Array.from(Array(this.count)).map(
      async (_value, index: number) => {
        return this.dataSource.manager.save(await this.new(properties, index))
      }
    )

    return Promise.all(saveLanguePromises).then((res) => {
      return res
    })
  }

  private new(properties: string[], index): Promise<Langue> {
    const langueModel = this.dataSource.manager.create(Langue, {})

    properties.forEach((property: string) => {
      const seederFunction = Reflect.getMetadata(`${property}:seed`, langueModel)
      if (seederFunction) {
        langueModel[property] = seederFunction(index)
      }
    })

    return Promise.resolve(langueModel)
  }
}
