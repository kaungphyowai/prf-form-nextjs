// accept prfno
// return if user don't exist => side effect
// if user exist => side effect + userInfo

export default async function checkPrfSubmit(prfno ,setuserExist, setisChecking, setUserInfo, setHasPermissonThisMonth, userRole) {

    console.log(prfno);
    setisChecking(true)
    // Get the prfNo id (Or customer id)
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
    let answer = json.message;

    //if the data is not there
    if(!answer)
    {
        //handle the case
        setuserExist(false)
        setisChecking(false)
        return;
    }

    //check if the user has permission
    
    var raw = JSON.stringify({
    "name": json.name.trim(),
    "email": json.email.trim()
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response1 = await fetch("/api/checkPermission", requestOptions)
    let bool = await response1.json()
    if(!bool)
    {
        setisChecking(false)
        setHasPermissonThisMonth(bool);
        setuserExist(true);
        if(userRole == 'admin')
        {
            setUserInfo({
                'name': json.name,
                'email': json.email,
                'prf_no': json.prf_no,
                'expire_date': json.expire_date
            })
        }

        return;
    }
    setHasPermissonThisMonth(true);
    
    setUserInfo({
        'name': json.name,
        'email': json.email,
        'prf_no': json.prf_no,
        'expire_date': json.expire_date
    })

    setuserExist(true)
    setisChecking(false)
    // set the user data
    
    

    
    //if prfno don't exist, set the userDon't exsit

}