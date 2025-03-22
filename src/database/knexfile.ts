import { client, database } from '#/configs';

export default {
  development: {
    ...database,
    useNullAsDefault: client === 'sqlite', // SQLite 需要這個設定
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};
