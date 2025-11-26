// // lib/db.ts
// // import "../lib/setup";
// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entities/User";

// // Fix: ensure global type (Next.js dev reload safe)
// declare global {
//   // eslint-disable-next-line no-var
//   var _dataSource: DataSource | undefined;
// }

// export const AppDataSource =
//   global._dataSource ||
//   new DataSource({
//     type: "postgres",
//     url: process.env.DATABASE_URL,
//     synchronize: true,
//     logging: true,
//     entities: [User],
//   });

// // Save in global to prevent multiple connections (Turbopack reload)
// if (!global._dataSource) {
//   global._dataSource = AppDataSource;
// }

// export async function dbConnect() {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }
//   return AppDataSource;
// }
import { DataSource } from "typeorm";
import { User } from "../lib/entities/User";

const globalForDB = global as unknown as { db: DataSource | undefined };

export const AppDataSource =
  globalForDB.db ??
  new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities: [User],
  });

if (!globalForDB.db) {
  globalForDB.db = AppDataSource;
}
