const queries = {
    GET_ACCOUNTS:  `SELECT a.AccountNumber, a.Balance, u.UserName 
                    FROM accounts a INNER JOIN users u on a.Id = u.Id 
                    WHERE u.UserName not like 'tpmr_%' AND a.Balance >= @balance`,

    UPDATE_BALANCE: `UPDATE accounts SET Balance = Balance + 5000
                     WHERE Id in
                        (SELECT Id FROM users where username not like 'tpmr_%')                     
                     `,

}

module.exports = queries;