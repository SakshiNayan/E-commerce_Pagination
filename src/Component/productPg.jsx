import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './productPg.css'
import Pagination from './pagination';
import Popup from './popup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
function ProductPg() {
    const showperPg  =5;
    const [pagination, setpagination] = useState({
        start :0,
        end: showperPg
    })
    const onPaginationChange = (start,end)=>{
        setpagination({start : start,end : end})
    }

  
    const [data, setdata]= useState([])
    const [show, setShow] = useState(false);
    const [tempData, settempData] = useState([]);

    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products').then((fakedata)=>{
            console.log(fakedata.data)
            setdata(fakedata.data)
    
        })
    },[])

    const handleModal = (desc, cat, image) => {
        let tempData = [desc, cat, image];
        settempData(item => [1, ...tempData]);
        setShow(true);
    }

    const handleHoverModal = (desc, cat, image) => {
        let tempData = [desc, cat, image];
        settempData(item => [1, ...tempData]);
        setTimeout(() => {
            setShow(true)
        }, 500)
    }
    const handleMen = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `men's clothing`
                }))
            })
    }
    const handleElectronics = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `electronics`
                }))
            })
    }
    const handleJewelery = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `jewelery`
                }))
            })
    }
    const handleWomen = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `women's clothing`
                }))
            })
    }
    const handleAll = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json)
            })
    }

  return (
    <>
        <div id='head'><h1>AVAILABLE PRODUCTS</h1></div>
        <div>
         
            <DropdownButton id="dropdown-basic-button" title="categories" className='m-4'>
                <Dropdown.Item onClick={handleAll}>All Products</Dropdown.Item>
                <Dropdown.Item onClick={handleElectronics}>Electronics</Dropdown.Item>
                <Dropdown.Item onClick={handleJewelery}>Jewelery</Dropdown.Item>
                <Dropdown.Item onClick={handleMen}>Men's Clothing</Dropdown.Item>
                <Dropdown.Item onClick={handleWomen}>Women's Clothing</Dropdown.Item>
            </DropdownButton>
        </div>

        <div id='main-body'>
            {data.slice(pagination.start , pagination.end).map((item,i)=>{
                return(
                    <div key={i}  className="productsection" >
                        <img src={item.image} 
                            onClick={() => handleModal(item.description, item.category, item.image)}
                            onMouseOver={() => handleHoverModal(item.description, item.category, item.image)} />
                    </div>
                )
            })}

        </div>
        <div>
            <Pagination  showperPg={showperPg}  total ={data.length} onPaginationChange = {onPaginationChange}/>
        </div>
        {
                show === true ? <Popup image={tempData[3]} desc={tempData[1]} category={tempData[2]} show={show} setShow={setShow} /> : ""
            }
        {/* {itempop && <Popup closepop ={setitemPop}/>} */}
    </>
  )
}

export default ProductPg
