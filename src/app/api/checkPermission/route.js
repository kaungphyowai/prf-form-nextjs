//This function assume that user Already exists ( Important )
//Check if this user had used his/her monthly permission to add money
//Input: User Name and email
//Output: true or false (True if there is still permission) - false ( if there is no permission), {message: false} ( for non user exist )

export const dynamic = 'force-dynamic' // defaults to force-static
export async function POST(request) {

    const {name, email} = await request.json()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer patnpQ4mDC9KXdrtF.e9246b8367c0a009d3e873d9d1f514912e0139ee100f4835a729727101c18ed4");
    myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; AWSALB=VqfDhfXjv8JiCp3lJNYXbUYmTndWTwyFShNBsWdkDM8qt85zGxNFW9yr+/FLQmTw7nAbahafAP1b1jC/mCjL+x5gJx8QYlmSGSeiIh1TKQ/PZosgNCkmW1HYRcwe; AWSALBCORS=VqfDhfXjv8JiCp3lJNYXbUYmTndWTwyFShNBsWdkDM8qt85zGxNFW9yr+/FLQmTw7nAbahafAP1b1jC/mCjL+x5gJx8QYlmSGSeiIh1TKQ/PZosgNCkmW1HYRcwe");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    let response = await fetch(`https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblF0xccXeUryzaL1?fields%5B%5D=notion_create_time&fields%5B%5D=Create+Time&filterByFormula=IF(AND(%22${name}%22+%3D+TRIM(Name)%2C+%22${email}%22+%3D+TRIM(Email)%2C'%E1%80%95%E1%80%9A%E1%80%BA%E1%80%96%E1%80%BB%E1%80%80%E1%80%BA'+!%3D+Status)%2CTRUE()%2C+FALSE()+)&maxRecords=1&sort%5B0%5D%5Bfield%5D=Create+Time&sort%5B0%5D%5Bdirection%5D=desc`, requestOptions)


    let json = await response.json();
    let records = await json.records;
    let record = records[0].fields;
    let now = new Date().getMonth();

    if(Object.hasOwn(record, "notion_create_time"))
    {
        console.log(record['notion_create_time'])
        let lastestTranscation = new Date(record['notion_create_time'])
        let lastestTranscationMonth = lastestTranscation.getMonth();
        console.log(lastestTranscationMonth)
        console.log(now)
        
        // only allow if latest transaction month is past
        return Response.json(lastestTranscationMonth < now)
    }
    
    let lastestTranscation = new Date(record['Create Time'])
    let lastestTranscationMonth = lastestTranscation.getMonth();
    console.log(lastestTranscation < now);
    return Response.json(lastestTranscationMonth < now)

}
