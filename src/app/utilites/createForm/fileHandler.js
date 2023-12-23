//Update the setFile to a bunch of file
//input is setfile functions and files
import { uploadData } from 'aws-amplify/storage';
import { getUrl } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export default async function filehandler(files, setFile, filesState) {
    let arrayFiles= [];
    console.log(files)
    // get the submitted files
    for(let i = 0; i < files.length; i++)
    {
        arrayFiles.push(files[i])
    }
    console.log(arrayFiles)

    // get the previous files

    //Every file in current files
    // for(let file in arrayFiles)
    // {
    //     var formdata = new FormData();
    //     formdata.append("file", arrayFiles[file], arrayFiles[file].name);
    //     formdata.append("", arrayFiles[file], "file");

    //     var requestOptions = {
    //     method: 'POST',
    //     body: formdata,
    //     redirect: 'follow'
    //     };

    //     let response = await fetch("/api/uploadFile", requestOptions)
    //     let json = await response.json();
    //     url.push(json['fileUrl'])
    // }
    // setFile(url) // give the urls
    let url = []; 
    // upload all submitted files
    for(let file in arrayFiles)
    {
        try {
            const result = await uploadData({
              key: uuidv4() + arrayFiles[file].name,
              data: arrayFiles[file],
              options: {
                onProgress: ({ transferredBytes, totalBytes }) => {
                  if (totalBytes) {
                    console.log(
                      `Upload progress ${
                        Math.round(transferredBytes / totalBytes) * 100
                      } %`
                    );
                  }
                }
              }
            }).result;
            
            let fileName = result.key;
            const respone = await getUrl({ key: fileName });
            const tmpURL = respone.url
            url.push(tmpURL);
            
          } catch (error) {
            console.log('Error : ', error);
          }
    }

    setFile([...filesState,...url])

}