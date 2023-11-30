//Update the setFile to a bunch of file
//input is setfile functions and files

export default async function filehandler(files, setFile, filesState) {
    let arrayFiles= [];
    for(let i = 0; i < files.length; i++)
    {
        arrayFiles.push(files[i])
    }
    let url = filesState;
    for(let file in arrayFiles)
    {
        var formdata = new FormData();
        formdata.append("file", arrayFiles[file], arrayFiles[file].name);
        formdata.append("", arrayFiles[file], "file");

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        let response = await fetch("/api/uploadFile", requestOptions)
        let json = await response.json();
        url.push(json['fileUrl'])
    }
    setFile(url) // give the urls


}