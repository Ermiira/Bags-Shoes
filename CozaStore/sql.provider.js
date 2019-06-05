var mysql = require('mysql2/promise');

let conn = null;

class SqlProvider {
  static async getConnection() {
    const config = {
        host: "localhost",
        user: "root",
        password: "",
        database: 'e-commerce'
    };
    if (conn) {
      return conn
    }

    conn = await mysql.createConnection(config);

    return conn;
  }
}

module.exports = SqlProvider;