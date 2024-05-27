let db = require('../db')

async function fetchPendingForm()
{
    // query to the database
    // 1. Status should be pending
    // 2. 

    // get the necessary data from the database


    // 
    databaseName = "Pending_Approvals";
    result = await db(`Select * From ${databaseName}`, []);

    return [
        {
            id: 1,
            formSubmitter: "Mg Mg",
            status: "Pending"
        }
    ];
}
module.exports = fetchPendingForm;