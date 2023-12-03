export default async function extendUserSubmit(event, currency, supportRegion ,files, setloading, formFillingPerson) {
    event.preventDefault()
    
    setloading(true)
    //get the form Data
    const data = new FormData(event.currentTarget)
    const prfno = data.get('prfno')
    const amount = data.get("amount")
    const month = data.get("month");
    const wallet = JSON.parse(data.get("wallets"))  // wallet = {id: .., name: ...} -> need to put id into the field
    const notes = data.get("notes")
    const contactLink = data.get("contactLink")

    //Get the prfNo id (Or customer id)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "prfno": prfno
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const result =  await fetch("/api/getUserId", requestOptions)
    let json = await result.json();
    //if the data is not there
    if(!result)
    {
        //handle the case

    }
    //if the data is there -> upload to airtable
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        console.log(window.location.hostname)
    var raw = JSON.stringify({
    "records": [
        {
        "fields": {
            "Name": json.name,
            "Email": json.email,
            "Status":  '၁ - ဖောင်တင်သွင်း',
            "Currency":  currency,
            "Amount": parseInt(amount),
            "Month": parseInt(month),
            "support_region": supportRegion,
            "notes": notes,
            "contact_person_link": contactLink,
            "wallet": [wallet.id],
            "screenshot": files.map((url) => {return {url: url.href}}),
            "notion_form_filled_person": formFillingPerson

            
        }
        }
    ]
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(`/api/createNewUser`, requestOptions)

     json = await response.json();

    location.reload();
}