import { type Knex } from "knex";

const TABLE_NAME = "users";
const EMAIL_MAXIMUM_LENGTH = 71;

const ColumnName = {
	CREATED_AT: "created_at",
	EMAIL: "email",
	ID: "id",
	PASSWORD_HASH: "password_hash",
	PASSWORD_SALT: "password_salt",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.EMAIL, EMAIL_MAXIMUM_LENGTH).unique().notNullable();
		table.text(ColumnName.PASSWORD_HASH).notNullable();
		table.text(ColumnName.PASSWORD_SALT).notNullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
