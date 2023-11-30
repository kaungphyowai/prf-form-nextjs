// accept name and email
// return if user don't exist => return {message: false}
// if user exist => return {message: true, name: name, email: emai; prfNo: prfNo}

export const dynamic = 'force-dynamic' // defaults to force-static
export async function POST(request) {

    const {name, email} = await request.json()

    //get the customer data base
    let response;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.AIRTABLE_TOKEN}`);
    myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    response = await fetch("https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblidhvo53AOty6w0/", requestOptions)
    


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