export default async function extendUserSubmit(event,userInfo, currency, supportRegion ,files, setloading, formFillingPerson, setAmountValidate, setmonthValidate, setmanyChatValidate, fileExist, setfileExist) {
    event.preventDefault();
    setloading(true)
    setAmountValidate(false);
    setmonthValidate(false)
    setmanyChatValidate(false)
    const data = new FormData(event.currentTarget);
    const amount = data.get("amount")
    const month = data.get("month");
    const manychat = data.get('manychat')
    const wallet = JSON.parse(data.get("wallets"))
    const notes = data.get("notes")
    const contactLink = data.get("contactLink")
    //validate month and amount
    if(!/^\d+$/g.test(amount))
    {
      setAmountValidate(true);
      setloading(false)
      return;
    }
    if(!/^\d+$/g.test(month))
    {
      setmonthValidate(true);
      setloading(false)
      return;
    }
    if(!/^\d+$/g.test(manychat))
    {
      setmanyChatValidate(true);
      setloading(false)
      return;
    }

    //check if file exist
    if(files.length == 0)
    {
      setfileExist(false);
      setloading(false)
      return;
    }
    console.log("First URL of Image: " + files[0].href)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "records": [
    {
      "fields": {
        "Name": userInfo.name,
        "Email": userInfo.email,
        "Status":  "၁ - ဖောင်တင်သွင်း",
        "Currency":  currency,
        "Amount": parseInt(amount),
        "Month": parseInt(month),
        "support_region": supportRegion,
        "notes": notes,
        "contact_person_link": contactLink,
        "wallet": [wallet.id],
        "screenshot": files.map((url) => {return {url: url.href}}),
        "notion_form_filled_person": formFillingPerson,
        "manychat_id": parseInt(manychat)
      }
    }
  ]
});
console.log(raw)

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  let response = await fetch(`/api/createNewUser`, requestOptions)
  location.reload();
}