import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';

const addroute = '/api/item';

const handleadd = (itemname, quantity) =>{
    axios.post(addroute, {
        name: itemname,
        quantity: quantity
    }).then(resp=>{
        if(resp.status ===200)
        alert(`Added ${quantity} ${itemname}`)   
    }).catch(err=>{
        alert(`Could not add to cart, Please try again later`);
    });
    
}


function AddItem({itemname}){

    const [itemcount,setcount] = useState(0);

    return(
        <>
            <div className="row justify-content-center">
                                <div className="col-3 text-center">
                                    <Button color="primary" onClick={()=>{
                                        itemcount>=1?setcount(itemcount-1):setcount(itemcount)
                                    }}> - </Button>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{itemcount}</p>
                                </div>
                                <div className="col-3 text-center">
                                    <Button color="primary" onClick={()=>{
                                        itemcount<=9?setcount(itemcount+1):setcount(itemcount)
                                    }}> + </Button>
                                </div>
                            </div>

            <div className="row justify-content-center">
                <Button color="secondary" onClick= { (e)=>{ e.preventDefault()
                    handleadd(itemname,itemcount) }}>Add To Cart</Button>
            </div>       
        </>
)
}

export default AddItem;