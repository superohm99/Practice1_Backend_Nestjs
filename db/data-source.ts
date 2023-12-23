import { DataSource, DataSourceOptions } from "typeorm";
// import { dotenv } from 'dotenv'
export const dataSourceOptions:DataSourceOptions={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'0801677792Zas#',
    database:'bazarapi',
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/db/migrations/*{.ts,js}'],
    logging:false,
    synchronize:true
}

const dataSource=new DataSource(dataSourceOptions);

export default dataSource;