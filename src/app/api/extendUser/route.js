export const dynamic = 'force-dynamic' // defaults to force-static
const db = require('../../utilites/db')


export async function POST(request) {

    //get customer ID based on the PRF no  
    

    const obj = await request.json()


  let now = new Date();
    const rows = await db(
      "INSERT INTO Transactions (CustomerID, SupportRegionID, WalletID, Amount, ScreenShot, AgentID, PaymentCheck, PaymentCheckTime, NoteID, TransactionDate, PaymentDenied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
      [obj['CustomerID'], obj['SupportRegionID'], obj['WalletID'], obj['Amount'], null, obj['AgentID'], false, null, obj['NoteID'], now, false]
  );

  return Response.json(rows)

    
}