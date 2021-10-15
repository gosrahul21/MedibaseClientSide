import React from 'react'
import Carousel from 'react-material-ui-carousel'
export default function RenderPrescription({images}) {
  
    return (
        <div className="imagelist">
            <Carousel style={{height:"50%"}}>
                {images.map((image)=>(
                     <img src={image.url} key={image.public_id} style={{height:"450px"}} alt=""/>
                ))}
               </Carousel>
           
        </div>
    )
}
