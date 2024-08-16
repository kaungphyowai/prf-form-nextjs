// import { NextResponse } from "next/server";
// import db from "../../utilites/db";


// async function getCustomerId(customerName, customerEmail)
// {
//   var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${process.env.AIRTABLE_TOKEN}`);
//     // myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; AWSALB=VqfDhfXjv8JiCp3lJNYXbUYmTndWTwyFShNBsWdkDM8qt85zGxNFW9yr+/FLQmTw7nAbahafAP1b1jC/mCjL+x5gJx8QYlmSGSeiIh1TKQ/PZosgNCkmW1HYRcwe; AWSALBCORS=VqfDhfXjv8JiCp3lJNYXbUYmTndWTwyFShNBsWdkDM8qt85zGxNFW9yr+/FLQmTw7nAbahafAP1b1jC/mCjL+x5gJx8QYlmSGSeiIh1TKQ/PZosgNCkmW1HYRcwe");
    
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };

//     let userNameURL = encodeURIComponent(customerName)
//     let emailURL = encodeURIComponent(customerEmail)

//     let data = await fetch(`https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblidhvo53AOty6w0?fields%5B%5D=prf_card_no&filterByFormula=AND(trim_name%3D'${userNameURL}'%2C+trim_email%3D'${emailURL}')`, requestOptions)
//     data = await data.json()

//     return data.records;
// }


// async function InsertCustomer(
//   customerName,
//   customerEmail,
//   agentId,
//   manyChatId,
//   contactLink
// ) {

//   // get the old customer id if exist
//   let record = await getCustomerId(customerName, customerEmail);
//   let customerID = null;
//   if(Array.isArray(record) && record.length > 0)
//   {
//     customerID = record[0].fields['prf_card_no']
//     //get only the id no
//     const regexp = /\d+/g;
//     customerID = customerID.match(regexp)[0];
//     customerID = parseInt(matches)
//   }

//   const query = `
//     INSERT INTO Customer (Name, Email, AgentID, ManyChatID, ContactLink, CardID ) VALUES (?, ?, ?, ?, ?)
//     `;
//   const values = [
//     customerName,
//     customerEmail,
//     agentId,
//     manyChatId,
//     contactLink,
//     customerID
//   ];
//   try {
//     const result = await db(query, values);
//     // console.log("Result: ", result);
//     return result.insertId; // Retrieve the inserted customer ID
//   } catch (error) {
//     console.error("Error inserting customer:", error);
//     return NextResponse.json(
//       { error: "Failed to insert customer" },
//       { status: 500 }
//     );
//   }
// }
// async function createNote(note, agentID) {
//   const query = `insert into Note (Note, Date, AgentID) values ( ?, ?, ?)`;
//   const values = [note, new Date(), agentID];
//   try {
//     const result = await db(query, values);
//     // console.log("Result: ", result);
//     return result.insertId;
//   } catch (error) {
//     console.error("Error inserting customer:", error);
//     return NextResponse.json(
//       { error: "Failed to insert customer" },
//       { status: 500 }
//     );
//   }
// }

// async function createScreenShot(screenShot,transactionsID) {
//   console.log(transactionsID +  "  " + screenShot)

//   let screenShotLink = await screenShot.map(async (item) => {
//     const query = `insert into ScreenShot (TransactionID , ScreenShotLink) values ( ?, ?)`;
    
//     const path = String(item.url).substring(0,String(item.url).indexOf('?'))
//     const values = [transactionsID, path];

//     try {
//       const result = await db(query, values);
//       console.log("result " + result)
//       // console.log("Result: ", result);
//       return result.insertId;
//     } catch (error) {
//       console.error("Error inserting ScreenShot:", error);
//       return 
//     }
//   })
//   return screenShotLink
//   // return screenShotLink;
// }
// export async function POST(req) {
//   try {
//     let json = await req.json();

//     const {
//       customerName,
//       customerEmail,
//       agentId,
//       supportRegionId,
//       manyChatId,
//       contactLink,
//       amount,
//       month,
//       note,
//       walletId,
//       screenShot,
//     } = json;

//     if (!screenShot) {
//       return NextResponse.json(
//         { error: "You need to provide a screenshot" },
//         { status: 400 }
//       );
//     }
//     const customerId = await InsertCustomer(
//       customerName,
//       customerEmail,
//       agentId,
//       manyChatId,
//       contactLink
//     );
//     console.log("customerId: ", customerId);

//     const noteId = await createNote(note, agentId);
//     console.log("noteId: ", noteId);

//     const query = `
//      INSERT INTO Transactions   
//     (CustomerID, Amount, AgentID, SupportRegionID, WalletID, TransactionDate, NoteID, Month) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)

//     `;
//     const values = [
//       customerId,
//       amount,
//       agentId,
//       supportRegionId,
//       walletId,
//       new Date(),
//       noteId,
//       month,
//     ];
//     const result = await db(query, values);

//     const transactionId = result.insertId;
//     console.log("Transaction ID " + transactionId)

//     const screenShotIds = await createScreenShot(screenShot, transactionId)
//     // console.log("Screenshot ids are: " + screenShotIds)
//     // console.log("Result: ", result);
//     return Response.json({ status: "success" });
//   } catch (error) {
//     console.log(error);
//   }
// }


import { NextResponse } from "next/server";
import db from "../../utilites/db";

/**
 * Calculate the next expire date based on the current expire date and additional month.
 * Month > 0 (Must)
 * @param {Date} currentExpireDate 
 * @param {Number} month 
 * @returns Date Object: contains the final expire date
 */
function calculateExpireDate(currentExpireDate, month)
{
  // we will assume that currentExpireDate will be always at the end of the month
  console.log(currentExpireDate.getFullYear())
  console.log(currentExpireDate.getMonth())
  console.log(month)
  return new Date(currentExpireDate.getFullYear(), currentExpireDate.getMonth() + 1 + month, 0);

}

async function InsertCustomer(
  customerName,
  customerEmail,
  agentId,
  manyChatId,
  contactLink,
  expireDate,
  cardId,
  month
) {

  let raw = {
    customerName,
    customerEmail,
    agentId,
    manyChatId,
    contactLink,
    expireDate,
    cardId,
    month
  }
  console.log(raw)
  let nextExpireDate = calculateExpireDate(expireDate, month)
  console.log(nextExpireDate)
  const query = `
    INSERT INTO Customer (Name, Email, AgentID, ManyChatID, ContactLink, ExpireDate, CardID ) VALUES (?, ?, ?, ?, ?, ? , ?)
    `;
  const values = [
    customerName,
    customerEmail,
    agentId,
    manyChatId,
    contactLink,
    nextExpireDate,
    cardId
  ];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result.insertId; // Retrieve the inserted customer ID
  } catch (error) {
    console.error("Error inserting customer:", error);
    return NextResponse.json(
      { error: "Failed to insert customer" },
      { status: 500 }
    );
  }
}
async function createNote(note, agentID) {
  const query = `insert into Note (Note, Date, AgentID) values ( ?, ?, ?)`;
  const values = [note, new Date(), agentID];
  try {
    const result = await db(query, values);
    // console.log("Result: ", result);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting customer:", error);
    return NextResponse.json(
      { error: "Failed to insert customer" },
      { status: 500 }
    );
  }
}

async function createScreenShot(screenShot,transactionsID) {
  console.log(transactionsID +  "  " + screenShot)

  let screenShotLink = await screenShot.map(async (item) => {
    const query = `insert into ScreenShot (TransactionID , ScreenShotLink) values ( ?, ?)`;
    
    const path = String(item.url).substring(0,String(item.url).indexOf('?'))
    const values = [transactionsID, path];

    try {
      const result = await db(query, values);
      console.log("result " + result)
      // console.log("Result: ", result);
      return result.insertId;
    } catch (error) {
      console.error("Error inserting ScreenShot:", error);
      return 
    }
  })
  return screenShotLink
  // return screenShotLink;
}
export async function POST(req) {
  try {
    let json = await req.json();

    let {
      customerName,
      customerEmail,
      agentId,
      supportRegionId,
      manyChatId,
      contactLink,
      amount,
      month,
      note,
      walletId,
      screenShot,
      expireDate,
      cardId
    } = json;
    month = parseInt(month)

    if(expireDate)
    {
      expireDate = new Date(expireDate)
    }

    if (!screenShot) {
      return NextResponse.json(
        { error: "You need to provide a screenshot" },
        { status: 400 }
      );
    }
    const customerId = await InsertCustomer(
      customerName,
      customerEmail,
      agentId,
      manyChatId,
      contactLink,
      expireDate,
      cardId,
      month
    );
    console.log("customerId: ", customerId);

    const noteId = await createNote(note, agentId);
    console.log("noteId: ", noteId);

    const query = `
     INSERT INTO Transactions   
    (CustomerID, Amount, AgentID, SupportRegionID, WalletID, TransactionDate, NoteID, Month, PaymentCheck) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;
    const values = [
      customerId,
      amount,
      agentId,
      supportRegionId,
      walletId,
      new Date(),
      noteId,
      month,
      false
    ];
    const result = await db(query, values);

    const transactionId = result.insertId;
    console.log("Transaction ID " + transactionId)

    const screenShotIds = await createScreenShot(screenShot, transactionId)
    console.log("Screenshot ids are: " + screenShotIds)
    console.log("Result: ", result);
    return Response.json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
}
