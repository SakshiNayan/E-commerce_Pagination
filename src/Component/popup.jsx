import React from 'react'
//import './popup.css'
import Modal from "react-bootstrap/Modal";
function Popup({ image, desc, category, show, setShow }) {
    const handleClose = () =>setShow(false);
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{category}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display : "flex" ,  gap : "20px" }}>
                  <div className="img" >
                     <img src={image} width = "200px" height="200px" alt="product" />
                  </div>
                  <div className="desc">
                    {desc}
                  </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
  )
}

export default Popup
