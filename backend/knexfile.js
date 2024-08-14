
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '12345',
      database: 'Election'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '12345',
      database: 'Election'
    }
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};