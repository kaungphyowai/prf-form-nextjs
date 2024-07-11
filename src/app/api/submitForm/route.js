const db = require('../../utilites/pendingForm/db')

export async function POST(request) {
    try {
        let data = await request.json();
        console.log('Received data:', data);
        let { name, email, prfhqid } = data;

        // Ensure name, email, and prfhqid are provided
        if (!name || !email || !prfhqid) {
            return new Response(JSON.stringify({ error: "Name, email, and prfhqid are required." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // find the current name and email in the prfhq table
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer patur9N4mKx7GpWZv.da71f016c51cd75abbcea2d3efae8b4dcc2d73af79e75be47183822e8439def1");
        // myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; brwConsent=opt-in; AWSALB=DBbkvKcoDb0lKZC7teFiZUn0R/EgEUmy3J/N8a/W6F9juRM469A5SddNXCCofZ39Fbcb26oMRZTMxGl43AoWooe5oIqdK8nEamr1tnL1zeagXCPqPg00t21BKYE7; AWSALBCORS=DBbkvKcoDb0lKZC7teFiZUn0R/EgEUmy3J/N8a/W6F9juRM469A5SddNXCCofZ39Fbcb26oMRZTMxGl43AoWooe5oIqdK8nEamr1tnL1zeagXCPqPg00t21BKYE7");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };
        let prfhq_id = encodeURIComponent(prfhqid)
        console.log(prfhq_id)
        let response = await fetch(`https://api.airtable.com/v0/appp80DDZ7FHxqCc1/tblm1UaS2JsGRqPrM?filterByFormula=HQID%3D'PRFHQ-56069'`, requestOptions);
        let r1 = await response.json()
        let old_name = r1.records[0].fields.trim_name;
        let old_email = r1.records[0].fields.Email;
        console.log(old_name)
        console.log(old_email)

        // Insert the data into the database
        const query = `
            INSERT INTO development.Pending_Approvals (prfhq_id, status, submitter_name, submitted_at, old_name, old_email, new_name, new_email)
            VALUES (?,?,?,?,?,?,?,?)
        `;

        let results = await db(query, [prfhqid, "pending", "John", new Date(), old_name, old_email, name, email]);
        let id = results.insertId;
        // update the logs
    const query2 = `INSERT INTO Review_Logs (approval_id, action, action_timestamp, actor) VALUES (?, ?, ?, ?)`
    let result2 = await db(query2, [id,'created', new Date(), "Admin user"])
        return new Response(JSON.stringify(results), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error inserting data into database:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
}
