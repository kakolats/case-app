import { DataSource } from 'typeorm'

import { Postulant } from '../../resources/postulant/postulant.entity'

export class PostulantSeeder {
  dataSource: DataSource
  count: number

  constructor(dataSource: DataSource, count: number) {
    this.dataSource = dataSource
    this.count = count
  }

  async seed(): Promise<Postulant[]> {
    console.log('\x1b[35m', '[] Seeding postulants...')

    const properties: string[] = this.dataSource
      .getMetadata(Postulant)
      .ownColumns.map((column) => column.propertyName)

    const savePostulantPromises: Promise<Postulant>[] = Array.from(Array(this.count)).map(
      async (_value, index: number) => {
        return this.dataSource.manager.save(await this.new(properties, index))
      }
    )

    return Promise.all(savePostulantPromises).then((res) => {
      return res
    })
  }

  private new(properties: string[], index): Promise<Postulant> {
    const postulantModel = this.dataSource.manager.create(Postulant, {})

    properties.forEach((property: string) => {
      const seederFunction = Reflect.getMetadata(`${property}:seed`, postulantModel)
      if (seederFunction) {
        postulantModel[property] = seederFunction(index)
      }
    })

    return Promise.resolve(postulantModel)
  }
}
