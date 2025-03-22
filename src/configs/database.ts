export const client = process.env.DB_TYPE || 'mysql';

export const database = {
  client,
  connection:
    client === 'mysql'
      ? {
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 3306,
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD || '',
          database: process.env.MYSQL_DB_NAME || 'rpg_game',
        }
      : { filename: `./${process.env.SQLITE_DB_NAME}` },
};
