import React, { useState } from 'react'
import './popup.css'
function Popup() {
    const [pop, setpop]= useState(false)
  return (
    <>
    <div id='productPop'>
        <div id='itemCard'>
            <div className='heading'>
                <span>{pop.category}</span>
                <button>Close</button>
            </div>
            <div className='itemBody'>
                <img src={pop.image}/>
                <span style={{"textAlign":"left","marginLeft":"20px"}}> <span style={{"fontWeight":"bold"}}>Desricption :</span> {pop.description}</span>
            </div>
        

        </div>
    </div>
      
    </>
  )
}

export default Popup
