


export default async function checkUserSubmit(event, setUserExistState, setFinishCheck, setCreateFormShow, setUserInfo, setHasPermissonThisMonth) {
    
    event.preventDefault();
    setFinishCheck(true)
    const data = new FormData(event.currentTarget);
    const email = data.get("email").trim();
    const name = data.get("name").trim();
    
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": name,
    "email": email
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response =await fetch("/api/checkUser", requestOptions)


    let answer = await response.json();
    let userExist = answer.message;

    setUserInfo({"name": name, "email": email})
    
    //if user exist, get PRF and expire data about user
    if(userExist)
    {
        //check if the user has permission
        console.log("This is has permission: ")
        let response = await fetch("/api/checkPermission/", requestOptions)
        let bool = await response.json();

        console.log(bool)
        if(!bool)
        {
            setHasPermissonThisMonth(bool)
            return;
        }
        setUserInfo({
            "name": name,
            "email": email,
            "prf_no": answer['prf_no'],
            "expire_date": answer['expire_date'][0]
        })
        console.log(answer['expire_date'])
    }

    setUserExistState(userExist)

    //show the created form if the user don't exist
    setCreateFormShow(!userExist)
}