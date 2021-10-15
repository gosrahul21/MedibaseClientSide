import React,{useState} from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { IconButton,CircularProgress } from "@material-ui/core";
import {PhotoCamera,CancelOutlined} from '@material-ui/icons'

import './FileUpload.css'
const FileUpload = ({ images, setImages}) => {
  const [loading,setLoading] = useState(false)
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios.post(
                `${process.env.REACT_APP_API}/image`,
                { image: uri },
                {
                  headers: {
                    token: localStorage.getItem('token_id'),
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                setImages([ ...images, res.data ]);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios.delete(
        `${process.env.REACT_APP_API}/image/${public_id}`
        ,{
          headers: {
            token: localStorage.getItem('token_id'),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {images.length?
          images.map((image) => (
           <div className="prescription_image_item">
              <img
                src={image.url}
                size={200}
                shape="square"
                className="ml-3"
                key={image.public_id}
                alt=""
              /><CancelOutlined  onClick={() => handleImageRemove(image.public_id)}/>
           </div>
             
            
          )):null}
          <div className="prescription_image_item">
            {loading&&<CircularProgress/>}
          </div>
          
      </div>
      <div className="row">
      <label htmlFor ="pres_image">

     Add Prescriptions
        <IconButton color="primary"  component="span">
          <PhotoCamera color="primary" fontSize="small"/>
        </IconButton>
      <input onChange={(e)=>{
        fileUploadAndResize(e)
      }} 
      accept="image/*"   
      placeholder="prescription image" 
      id="pres_image" 
      type="file" multiple/>
</label>
      </div>
    </>
  );
};

export default FileUpload;