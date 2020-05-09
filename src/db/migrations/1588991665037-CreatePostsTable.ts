import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePostsTable1588991665037 implements MigrationInterface {
    name = 'CreatePostsTable1588991665037'

    table = new Table({
        name: "post",
        columns: [
            {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            },
            {
                name: "user_id",
                type: "integer",
                isNullable: false,
            },
            {
                name: "text",
                type: "varchar",
                length: "140",
                isNullable: false,
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
        foreignKeys: [
            {
                columnNames: ["user_id"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                name: "fk_user_id"
            }
        ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
        
    }

}
