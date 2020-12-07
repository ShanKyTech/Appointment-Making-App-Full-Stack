module.exports = {
    HOST: "node-db.cqhpxu1bwxjr.us-east-1.rds.amazonaws.com",
    USER: "root",
    PASSWORD: "localhost1665",
    DB: "node_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};