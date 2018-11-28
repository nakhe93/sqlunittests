const queries = require('../queries.js');

let unitTest = require('sql-unittest');
 
//Test suite
describe('Testing get accounts contacts query', () => {
 
    let db;

    //test query
    let testQuery = queries.GET_ACCOUNTS;
 
    //Account Table Schema
    let accountSchema = {
        Id: 'INTEGER',
        AccountNumber: 'NUMERIC',
        Balance: 'REAL' 
    };

    //Account Table Schema
    let userSchema = {
        Id: 'INTEGER',
        UserName: 'VARCHAR'
    };
 
    //Mock data for Accounts table
    let accountData = [
        {
            Id: 1,
            AccountNumber: 1001,
            Balance: 5000
        },
        {
            Id: 2,
            AccountNumber: 1002,
            Balance: 15000
        },
        {
            Id: 3,
            AccountNumber: 1003,
            Balance: 8000
        },
        {
            Id: 4,
            AccountNumber: 1004,
            Balance: 11000
        }
    ];

    //Mock data for Users table
    let userData = [
        {
            Id: 1,
            UserName: 'tpmr_test1'
        },
        {
            Id: 2,
            UserName: 'tpmr_test2'
        },
        {
            Id: 3,
            UserName: 'test3'
        },
        {
            Id: 4,
            UserName: 'test4'
        },
    ]
 
    before(async () => {  
 
        //instantiate a new db instance
        db = unitTest.instantiateDb();
 
        //create table
        await unitTest.createTable(db, "accounts", accountSchema);
        await unitTest.createTable(db, "users", userSchema);
 
        //insert data in table
        await unitTest.insert(db, "accounts", accountData);
        await unitTest.insert(db, "users", userData);
    });
    
    after(function(){
        unitTest.closeDb(db);
    });
 
    //Test Cases
    it('should verify that number of records returned by the testquery is 1', async() => {
       let testQueryResult = await unitTest.runQuery(db, testQuery, [10000]);

        unitTest.AssertLength(testQueryResult, 1);    
    });
 
    it('should contain the given record in the results from running test query', async() => {
        let testQueryResult = await unitTest.runQuery(db, testQuery, [10000]);

        unitTest.AssertContains(testQueryResult, {UserName: 'test4', AccountNumber: 1004});    
    });
 
    it('should not contain the given record in the results from running test query', async() => {
        let testQueryResult = await unitTest.runQuery(db, testQuery, [10000]);

        unitTest.AssertNotContains(testQueryResult, {Name: 'tpmr_test2'});    
    });
});

describe('Testing get accounts contacts query', () => {
 
    let db;
    let testQueryResult;

    //test query
    let testQuery = queries.UPDATE_BALANCE;
 
    //Account Table Schema
    let accountSchema = {
        Id: 'INTEGER',
        AccountNumber: 'NUMERIC',
        Balance: 'REAL' 
    };

    //Account Table Schema
    let userSchema = {
        Id: 'INTEGER',
        UserName: 'VARCHAR'
    };
 
    //Mock data for Accounts table
    let accountData = [
        {
            Id: 1,
            AccountNumber: 1001,
            Balance: 5000
        },
        {
            Id: 2,
            AccountNumber: 1002,
            Balance: 15000
        },
        {
            Id: 3,
            AccountNumber: 1003,
            Balance: 8000
        },
        {
            Id: 4,
            AccountNumber: 1004,
            Balance: 11000
        }
    ];

    //Mock data for Users table
    let userData = [
        {
            Id: 1,
            UserName: 'tpmr_test1'
        },
        {
            Id: 2,
            UserName: 'tpmr_test2'
        },
        {
            Id: 3,
            UserName: 'test3'
        },
        {
            Id: 4,
            UserName: 'test4'
        },
    ]
 
    before(async () => {  
 
        //instantiate a new db instance
        db = unitTest.instantiateDb();
 
        //create table
        await unitTest.createTable(db, "accounts", accountSchema);
        await unitTest.createTable(db, "users", userSchema);
 
        //insert data in table
        await unitTest.insert(db, "accounts", accountData);
        await unitTest.insert(db, "users", userData);

        testQueryResult = await unitTest.runDataManipulationQuery(db, "accounts" ,testQuery);
    });
    
    after(function(){
        unitTest.closeDb(db);
    });
 
    //Test Cases
    it('should contain the given record in the results from running test query', async() => {

        unitTest.AssertContains(testQueryResult, {AccountNumber: 1004, Balance: 16000});    
    });
 
    it('should not contain the given record in the results from running test query', async() => {
    
        unitTest.AssertContains(testQueryResult, {AccountNumber: 1002, Balance: 15000});    
    });
});
