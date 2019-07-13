module.exports = function (dbEngine, dbHost, dbPort, dbName, dbUsername, dbPassword) {
  return new Promise((resolve, reject) => {
    if (dbEngine !== 'mysql') {
      resolve()
      return
    }

    var mysql      = require('mysql');

    var connection = mysql.createConnection({
      host     : dbHost,
      port     : dbPort,
      database : dbName,
      user     : dbUsername,
      password : dbPassword
    });
    
    connection.connect();

    var query = mysql.format(
      `DELETE FROM ?? WHERE ?? = ?`,
      [`${dbName}.core_store`, 'key', 'plugin_content-manager_schema']
    )
    
    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
      connection.end();
    });
  })
}