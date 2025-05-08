const config = require("../../knexfile.js");
const knex = require("knex")({
  client: "pg",
  connection: config.test.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
});

async function truncateAllTables() {
  await knex.raw(
    `DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname =current_schema()) LOOP
    EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;
  `
  );
}

module.exports = { truncateAllTables };
