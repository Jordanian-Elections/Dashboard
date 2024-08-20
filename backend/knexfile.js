
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '12345',
      database: 'test1'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '12345',
      database: 'test1'
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};