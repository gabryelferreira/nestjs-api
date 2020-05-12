
import projectEntities from "./utils/testing-helpers/projectEntities";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const devConfig: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "nestjs.db",
    entities: projectEntities,
}

const prodConfig: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "dist/nestjs-prod.db",
    entities: projectEntities,
}

const config = {
    development: devConfig,
    production: prodConfig,
}

export function getEnvConfig(NODE_ENV?: string): TypeOrmModuleOptions {
    return config[NODE_ENV || 'development']
}