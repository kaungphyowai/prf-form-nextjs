import { useSearchParams } from 'next/navigation'

export default async function createFormSubmit(event, currency, supportRegion ,files, userInfo, setloading, formFillingPerson) {
    event.preventDefault();

    setloading(true)
    const data = new FormData(event.currentTarget);
    const amount = data.get("amount")
    const month = data.get("month");
    console.log(month)
    const wallet = JSON.parse(data.get("wallets"))
    const notes = data.get("notes")
    const contactLink = data.get("contactLink")


    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
    console.log(window.location.hostname)
var raw = JSON.stringify({
  "records": [
    {
      "fields": {
        "Name": userInfo.name,
        "Email": userInfo.email,
        "Status":  '၁ - ဖောင်တင်သွင်း',
        "Currency":  currency,
        "Amount": parseInt(amount),
        "Month": parseInt(month),
        "support_region": supportRegion,
        "notes": notes,
        "contact_person_link": contactLink,
        "wallet": [wallet.id],
        "screenshot": files.map((url) => {return {url: `https://${window.location.hostname}${url}`}}),
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

 await fetch(`/api/createNewUser`, requestOptions)

  //Delete all the ScreenShot from server after Upload
   myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(files);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const delay = ms => new Promise(res => setTimeout(res, ms));
await delay(5000)

await fetch(`/api/deleteFile`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  location.reload();

}
