const db = require('../../utilites/pendingForm/db')

export const dynamic = 'force-dynamic'


export async function POST(request) {
    const credentials = await getDatabaseCredentials();
    let data = await request.json();
    let {prfhqid} = data;
    const query = `SELECT status FROM development.Pending_Approvals where prfhq_id='PRF${prfhqid}'`;


    let results = await db(query, []);
    return Response.json(results);
}
