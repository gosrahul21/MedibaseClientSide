
import axios from 'axios'
import { path } from '../config';

import { GET_USER } from '../actions/actionTypes';

const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
    //   console.log(fileInfo);
    });
  };


export const upload = (img,dispatch)=>{
    axios.put(`${path}/user`,{avatar:img},{
        headers:{
            token:localStorage.getItem('token_id')
        }
    }).then(({data})=>{
        //show the notification that image uploaded
        console.log(data)
        dispatch({
            type:
            GET_USER,
            payload:data
        })
        console.log("image uploaded")
    }).catch((err)=>{
        console.log("image upload failed")
    })
}


  export default getBase64