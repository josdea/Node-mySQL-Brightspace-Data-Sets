//CONNECT TO DB - TODO UPDATE CREDENTIALS

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"  //TODO COMMENT THIS OUT IF THIS DATABASE DOESN'T EXIST YET
});

// END OF CONNECT TO DB

// CREATE DB - DONE FIRST TIME ONLY COMMENT OUT THIS portion after first time or if database already exists
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
// END OF CREATE DB

var tableCreateStatements = [];

tableCreateStatements.push("CREATE TABLE IF NOT EXISTS organizationalunits (OrgUnitId int(11) DEFAULT NULL, Organization text COLLATE utf8_unicode_ci, Type text COLLATE utf8_unicode_ci, Name text COLLATE utf8_unicode_ci, Code text COLLATE utf8_unicode_ci, StartDate text COLLATE utf8_unicode_ci, EndDate text COLLATE utf8_unicode_ci, IsActive text COLLATE utf8_unicode_ci, CreatedDate text COLLATE utf8_unicode_ci, IsDeleted text COLLATE utf8_unicode_ci, DeletedDate text COLLATE utf8_unicode_ci, RecycledDate text COLLATE utf8_unicode_ci ) ;");
tableCreateStatements.push("CREATE TABLE IF NOT EXISTS organizationalunitancestors ( OrgUnitId int(11) DEFAULT NULL, AncestorOrgUnitId int(11) DEFAULT NULL ) ;");
tableCreateStatements.push("CREATE TABLE IF NOT EXISTS userenrollments  (OrgUnitId int(11) DEFAULT NULL,   UserId int(11) DEFAULT NULL,   RoleName text,   EnrollmentDate text,   EnrollmentType text,   RoleId int(11) DEFAULT NULL );");
tableCreateStatements.push("CREATE TABLE IF NOT EXISTS users (UserId int(11) DEFAULT NULL, UserName text , OrgDefinedId text , FirstName text , MiddleName text , LastName text , IsActive text , Organization text , InternalEmail text , ExternalEmail text , SignupDate text ) ;");
tableCreateStatements.push("CREATE TABLE IF NOT EXISTS announcements (AnnouncementId int(11) DEFAULT NULL, OrgUnitId int(11) DEFAULT NULL, Title text , StartDate text , EndDate text , IsGlobal text , IsDraft text , HasReleaseCondition int(11) DEFAULT NULL, NumAttachments int(11) DEFAULT NULL, DeletedDate text , DeletedByUserId text , LastModified text ) ;");



con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  
  function tableCreate(value, index, array) {
  con.query(value, function (err, result) {
    if (err) throw err;
    console.log(value.substring(26,60) + "table created");
  });

}

tableCreateStatements.forEach(tableCreate);  //loops through above array of create table statements

});

// (`(\W)|`\ |`|\n| {2,}|ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci|collate utf8_unicode_ci|\s{2,})




