import { createConnection, EntitySchema } from 'typeorm';
import projectEntities from './projectEntities';
type Entity = Function | string | EntitySchema<any>

export async function createMemDB(entities: Entity[] = projectEntities) {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        entities,
        dropSchema: true,
        synchronize: true,
        logging: false
    });
}