const db = require('../../utilites/pendingForm/db')

export const dynamic = 'force-dynamic'


export async function POST(request) {
    const query = 'Select * from Pending_Approvals where status="pending"';
    let results = await db(query, []);
    return Response.json(results);
}