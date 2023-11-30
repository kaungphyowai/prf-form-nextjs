export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request) {
    const text = await request.text()
    console.log(text);

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${process.env.AIRTABLE_TOKEN}`);
myHeaders.append("Cookie", "brw=brwb8tzTqMzSEOnxJ");


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: text,
  redirect: 'follow'
};

fetch("https://api.airtable.com/v0/appI7DFXUC7sezXwg/tblF0xccXeUryzaL1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    return Response.json({})
}