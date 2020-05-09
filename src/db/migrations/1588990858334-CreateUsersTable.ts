import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1588990858334 implements MigrationInterface {
    name = 'CreateUsersTable1588990858334'

    table = new Table({
        name: "user",
        columns: [
            {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            },
            {
                name: "name",
                type: "varchar",
                length: "255",
                isNullable: false
            },
            {
                name: "username",
                type: "varchar",
                length: "50",
                isNullable: false,
                isUnique: true
            },
            {
                name: "password",
                type: "varchar",
                length: "255",
                isNullable: false
            },
            {
                name: "is_active",
                type: "boolean",
                default: 1
            },
            {
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP"
            },
            {
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP"
            }
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
