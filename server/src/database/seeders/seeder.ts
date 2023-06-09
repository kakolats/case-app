import { LangueSeeder } from './langue.seeder'
import { NiveauSeeder } from './niveau.seeder'
import { CompetenceSeeder } from './competence.seeder'
import { PostulantSeeder } from './postulant.seeder'
import 'dotenv/config'

import { DataSource } from 'typeorm'

import { appConnectionOptions } from '../app.connection.options'
import { PermissionSeeder } from './permission.seeder'
import { RoleSeeder } from './role.seeder'
import { SettingSeeder } from './setting.seeder'
import { UserSeeder } from './user.seeder'

seed()

async function seed() {
  // * Resource counts (keep comment for schematics).

const langueCount = 40

const niveauCount = 40

const competenceCount = 40

const postulantCount = 40

  const settingCount = 10
  const userCount = 40

  // Create connection.
  const dataSource: DataSource = new DataSource(appConnectionOptions)
  await dataSource.initialize()

  const settingSeeder: SettingSeeder = new SettingSeeder(
    dataSource,
    settingCount
  )
  const permissionSeeder: PermissionSeeder = new PermissionSeeder(dataSource)
  const roleSeeder: RoleSeeder = new RoleSeeder(dataSource)
  const userSeeder: UserSeeder = new UserSeeder(dataSource, userCount)

  const queryRunner = dataSource.createQueryRunner()

  const deleteTablePromises: Promise<void>[] = [
    // * Table names (keep comment for schematics).
  'langues',

  'niveaus',

  'competences',

  'postulants',

    'notifications',
    'users',
    'permission_role',
    'permissions',
    'roles',
    'settings'
  ].map(async (tableName: string) => {
    await queryRunner.query(`DELETE FROM ${tableName}`)
    await queryRunner.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1`)

    return
  })
  console.log('\x1b[35m', '[] Remove all existing data...')
  await Promise.all(deleteTablePromises)

  await permissionSeeder.seed()
  await settingSeeder.seed()
  await roleSeeder.seed()
  await userSeeder.seed()

  await (new PostulantSeeder(dataSource, postulantCount)).seed()
  await (new CompetenceSeeder(dataSource, competenceCount)).seed()
  await (new NiveauSeeder(dataSource, niveauCount)).seed()
  await (new LangueSeeder(dataSource, langueCount)).seed()
  await dataSource.destroy()

  console.log(
    '\x1b[33m',
    '[] Seed complete ! Please refresh your browser to see the new data.'
  )
}
