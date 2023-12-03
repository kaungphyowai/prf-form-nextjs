export const dynamic = 'force-dynamic' // defaults to force-static

//Input: Get PRF no
//Output: customer record id


export async function POST(request) {

    let json = await request.json()
    //get the prf no
    const prfNo = json['prfno']

    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer patnpQ4mDC9KXdrtF.e9246b8367c0a009d3e873d9d1f514912e0139ee100f4835a729727101c18ed4");
myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ; AWSALB=2axfHwemhNpfuITKCZwJTO+gsmdqPtjhjwDmGxWaQbJAS2igB3ub2K4M6w+r9B9jzzyJmcbXmA7rHAccX5CIeKdorD19nuGkIo5NxcL/wfpdkOWNfULyJefjor25; AWSALBCORS=2axfHwemhNpfuITKCZwJTO+gsmdqPtjhjwDmGxWaQbJAS2igB3ub2K4M6w+r9B9jzzyJmcbXmA7rHAccX5CIeKdorD19nuGkIo5NxcL/wfpdkOWNfULyJefjor25");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 let response = await fetch(`https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblidhvo53AOty6w0?filterByFormula=IF(%22PRF-${prfNo}%22%3Dprf_card_no%2CTRUE()%2C+FALSE())`, requestOptions)
    

    json = await response.json();

    if(json.records.length == 0)
    {
        return Response.json(false)
    }

    let id = json.records[0].id;
    let fields = json.records[0].fields;
    let name = fields["Name"]
    let Email = fields["Email"]

    return Response.json({
        "name": name,
        "email": Email,
        "id": id
    })

    /**
     * This is the final version But because of data scheme, we are doing the above way
     */
    // json = await response.json();

    // //if the record is empty
    // if(json.records.length == 0)
    // {
    //     return Response.json(false)
    // }

    // //if the record has an ID
    // let id = json.records[0].id;

    // return Response.json({id: id})
}