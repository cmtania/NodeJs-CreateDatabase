const { sqlConfig } = require('./.secrets.js')
const sql = require('msnodesqlv8')
const { rl } = require('./readLine.js');
const { stringify } = require('querystring');
const { Console } = require('console');

inputDatabase();

const connectionString = `server=${sqlConfig.server};Database=;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;

function createDatabase(dbName){
const query = `create database ${dbName}`;
 const result = sql.query(connectionString, query, (err, res) => {
    if (err) { if (err.code == 1801) { 
                console.log(`[SQL Server] Database ${dbName} already exists. Choose a different database name.\n`);
                inputDatabase() } 
            } 
            
    if (res) 
        console.log(`Created database ${dbName}\n`);
        console.log(`Do you want to create table for ${dbName}?`)
        rl.question('Y/N: ', function (ans) {
            if(ans.toUpperCase() == 'Y') 
                createTable(dbName);
            if(ans.toUpperCase() == 'N') {
                 console.log("bye");
                 endSystem()
            }
            
            rl.close();
        })
        
 });
}

function inputDatabase(){
    console.log("Create your database")
    rl.question("Database: ", function(dbName) {
        createDatabase(dbName);
        rl.close();
        
    });
}

function createTable(dbName){
    
    
    rl.question("TableName: ", function(dbName) {
        createDatabase(dbName);
        rl.close();
    });
}

function endSystem(){
    rl.on("close", function() {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
}
