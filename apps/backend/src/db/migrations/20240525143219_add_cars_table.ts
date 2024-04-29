import { type Knex } from "knex";

const TABLE_NAME = "cars";

const ColumnName = {
	ID: "id",
	IMAGE: "image",
	NAME: "name",
	RENT_PRICE: "rent_price",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.NAME).notNullable();
		table.string(ColumnName.IMAGE).notNullable();
		table.decimal(ColumnName.RENT_PRICE).notNullable();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
