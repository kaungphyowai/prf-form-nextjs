const db = require('../../utilites/pendingForm/db')

export const dynamic = 'force-dynamic'

// input: form id
// output: approve the form and change the airtable

export async function POST(request) {

    // deny the forms
    let data = await request.json();
    let {formid} = data;

    //get prfhqid, oldname, oldemail of the formid
    let query1 = `Select * from Pending_Approvals where approval_id="${formid}"`;
    let results1 = await db(query1, []);

    let prfhq_id = results1[0].prfhq_id;
    let old_name = results1[0].old_name;
    let old_email = results1[0].old_email;
    let new_name = results1[0].new_name;
    let new_email = results1[0].new_email;


    // get the record id of the customer from prfhq_table and customer_table
    let prfhq_record_id = [];
    let customer_record_id;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patur9N4mKx7GpWZv.da71f016c51cd75abbcea2d3efae8b4dcc2d73af79e75be47183822e8439def1");
    // myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; brwConsent=opt-in; AWSALB=DBbkvKcoDb0lKZC7teFiZUn0R/EgEUmy3J/N8a/W6F9juRM469A5SddNXCCofZ39Fbcb26oMRZTMxGl43AoWooe5oIqdK8nEamr1tnL1zeagXCPqPg00t21BKYE7; AWSALBCORS=DBbkvKcoDb0lKZC7teFiZUn0R/EgEUmy3J/N8a/W6F9juRM469A5SddNXCCofZ39Fbcb26oMRZTMxGl43AoWooe5oIqdK8nEamr1tnL1zeagXCPqPg00t21BKYE7");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };
    let userNameURL = encodeURIComponent(old_name)   
    let emailURL = encodeURIComponent(old_email)
    let response = await fetch(`https://api.airtable.com/v0/appp80DDZ7FHxqCc1/tblm1UaS2JsGRqPrM?filterByFormula=AND(trim_name%3D'${userNameURL}'%2CEmail%3D'${emailURL}'+)`, requestOptions);
    let r1 = await response.json()
    response = await fetch(`https://api.airtable.com/v0/appp80DDZ7FHxqCc1/tblZeEt4ay83MpLcL?filterByFormula=AND(trim_name%3D'${userNameURL}'%2CEmail%3D'${emailURL}'+)`, requestOptions);
    let r2 = await response.json()
    console.log(r2)

    
    r1.records.forEach(result => {
        prfhq_record_id.push(result.id);
    })

    customer_record_id = r2.records[0].id
    console.log("customer " + customer_record_id)
    // return Response.json({prfhq_record_id, customer_record_id});


    // change the name from prfhq table
    prfhq_record_id.forEach(async (id) =>
    {
        await updateNameAndEmail(id, "tblm1UaS2JsGRqPrM", new_name, new_email)
    }
    )

    // //change the name from prfhq table
    await updateNameAndEmail(customer_record_id, "tblZeEt4ay83MpLcL", new_name, new_email)


    let now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `Update Pending_Approvals Set status = "approved", approved_at="${now}" where approval_id=${formid}`;
    let results = await db(query, []);

    // update the logs
    const query2 = `INSERT INTO Review_Logs (approval_id, action, action_timestamp, actor) VALUES (?, ?, ?, ?)`
    let result2 = await db(query2, [formid,'updated', now, "Admin user"])

    return Response.json({results, result2 });
}

async function updateNameAndEmail (id, table, newName, newEmail)
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer patur9N4mKx7GpWZv.da71f016c51cd75abbcea2d3efae8b4dcc2d73af79e75be47183822e8439def1");

    const raw = JSON.stringify({
    "fields": {
        "Name": newName,
        "Email": newEmail
    }
    });

    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`https://api.airtable.com/v0/appp80DDZ7FHxqCc1/${table}/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}