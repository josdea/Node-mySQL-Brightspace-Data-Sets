var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"  //TODO COMMENT THIS OUT IF THIS DATABASE DOESN'T EXIST YET
});



var tableTruncateStatements = [];

tableTruncateStatements.push("TRUNCATE announcements;");
tableTruncateStatements.push("TRUNCATE organizationalunits;");
tableTruncateStatements.push("TRUNCATE organizationalunitancestors;");
tableTruncateStatements.push("TRUNCATE userenrollments;");
tableTruncateStatements.push("TRUNCATE users;");


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  function tableTruncate(value, index, array) {
    con.query(value, function (err, result) {
      if (err) throw err;
      console.log(value + " completed");
    });

  }

  tableTruncateStatements.forEach(tableTruncate);  //loops through above array of create table statements

});