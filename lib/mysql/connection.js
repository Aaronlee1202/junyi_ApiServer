import pkg from 'sequelize'
const { Sequelize } = pkg

//初始化MySQL連線
export const sequelize = new Sequelize({
    host: 'mypenghu.mysql.database.azure.com',
    database: 'junyidb',
    dialect: 'mysql',
    username: 'taadmin@mypenghu',
    password: 'ecs@1oT!',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: console.log,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
    },
}) // Example for postgres

//檢查是否連線成功

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })
