const db = require('../../utilites/pendingForm/db')

export const dynamic = 'force-dynamic'

// input: form id and a comment
// output: deny the form

export async function POST(request) {

    // deny the forms
    let data = await request.json();
    let {formid} = data;
    let now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `Update Pending_Approvals Set status = "approved", approved_at="${now}" where approval_id=${formid}`;
    let results = await db(query, []);

    // update the logs
    const query2 = `INSERT INTO Review_Logs (approval_id, action, action_timestamp, actor) VALUES (?, ?, ?, ?)`
    let result2 = await db(query2, [formid,'updated', now, "Admin user"])

    return Response.json({results, result2 });
}