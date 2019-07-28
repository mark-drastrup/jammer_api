require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.DBUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.DBUSER,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
