import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './productPg.css'
import Pagination from './pagination';
import Popup from './popup';
function ProductPg() {
    const showperPg  =5;
    const [pagination, setpagination] = useState({
        start :0,
        end: showperPg
    })
    const onPaginationChange = (start,end)=>{
        setpagination({start : start,end : end})
    }

    const [alldata, setAlldata]= useState([])
    const [data, setdata]= useState([])
    const [show, setShow] = useState(false);
    const [tempData, settempData] = useState([]);
    const [get , setget] = useState(true)
    
    const handleSelect=(e)=>{
        //const targetval = e.target.value
        // setshow(e.target.value)
        if(e.target.value === 'all'){
            setget(!get)
        }else{
            const newdata = alldata.filter((item)=>{
                return item.category.includes(e.target.value)
            })
            setdata(newdata)
        }


    }
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products').then((fakedata)=>{
            console.log(fakedata.data)
            setdata(fakedata.data)
            setAlldata(fakedata.data)
        })
    },[get])

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

  return (
    <>
        <div id='head'><h1>AVAILABLE PRODUCTS</h1></div>
        <div>
            <select onChange={(e)=>{handleSelect(e)}}>
                <option value='all'>All</option>
                <option value='electronic'>Electronics</option>
                <option value='women'>Women's Cloths</option>
                <option value='men'>Men's Cloths</option>
                <option value='Jwellery'>Jwellery</option>
            </select>
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
