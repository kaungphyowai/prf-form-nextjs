// accept name and email
// return if user don't exist => return {message: false}
// if user exist => return {message: true, name: name, email: emai; prfNo: prfNo}

export const dynamic = 'force-dynamic' // defaults to force-static
export async function POST(request) {

    const {name, email} = await request.json()

    //get the customer data base
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patnpQ4mDC9KXdrtF.e9246b8367c0a009d3e873d9d1f514912e0139ee100f4835a729727101c18ed4");
    myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; AWSALB=q0M9u0z8adQoHf839TIv42MWfxs27RilDRAi9z1GULKpLzBj+OW1pgPIfs9tEtyfrKt48Z7hLNYC11hQ9rkfdml27PiOPeUDeuL9hycGodaQFHXJbIwdbGOU2CWr; AWSALBCORS=q0M9u0z8adQoHf839TIv42MWfxs27RilDRAi9z1GULKpLzBj+OW1pgPIfs9tEtyfrKt48Z7hLNYC11hQ9rkfdml27PiOPeUDeuL9hycGodaQFHXJbIwdbGOU2CWr");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    let userNameURL = encodeURIComponent(name)
    let emailURL = encodeURIComponent(email)
    let response = await fetch(`https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblidhvo53AOty6w0?filterByFormula=IF(AND(%22${userNameURL}%22+%3D+Name%2C+%22${emailURL}%22+%3D+Email)%2CTRUE()%2CFALSE())`, requestOptions)
    


    let json = await response.json();
    let records = await json.records;
    let answer;

    let i = 0;
    for(i = 0; i < records.length; i++)
    {
        answer = records[i].fields['Name'] == name && records[i].fields["Email"] == email 
        if(answer == true)
        {
            break;
        }
    }

    //if userExist
    if(answer)
    {
        return Response.json({
            message: answer,
            name: records[i].fields['Name'],
            email: records[i].fields["Email"],
            prf_no: records[i].fields["prf_card_no"],
            expire_date: records[i].fields["expire_date (from test_hqid)"]
        })
    }


    return Response.json({
        message: answer
    });
}