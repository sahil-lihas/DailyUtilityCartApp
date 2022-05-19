import React, { useEffect, useReducer, useState } from 'react'
import {Button, Badge} from 'reactstrap'
import Axios from 'axios';
const getitems = '/api/item';
const updateitems = '/api/item/update';
const deleteitem = `/api/item/delete`;

function Cart(props) {

    const [cartitems,setcartitems] = useState();
    
    const getCartItems = () =>{
        Axios.get(getitems,{headers:{'accept': 'application/json'}}).then(resp=>{
            setcartitems(resp.data);
    }) }
    
    const update = (itemname, quantity) =>{
        Axios.put(updateitems,{
            name: itemname,
            quantity: quantity
        },{
            params: {
                name: itemname
            }
        }).then(resp=>{
            getCartItems();
        })
    }

    const deleteItem = (itemname) =>{
        Axios.delete(deleteitem+`?name=${itemname}`).then(resp=>{
            getCartItems();
        }).catch(err=>{
            alert(`not able to delete item ${itemname}, Please try again`)
        })
    }

    const handlesubtract = (itename,quant) =>{
        if(quant === 1)
        {
            deleteItem(itename);
        }
        else{
            update(itename,quant-1);
        }
    }


    const handleadd = (itename,quant) =>{
        
        if(quant === 10){
            alert('cannot add more than 10 for this item ');
        }
        else{
            update(itename,quant+1);
        }
    }

   
   useEffect(()=>{
        getCartItems();
    },[])
    
    if(!cartitems)
        return(<div>Loading....</div>)
    else 
    return(
        <div className="container mt-5" style={{minHeight:'100%'}}>
           
            {cartitems.items.map(it=>{
                return(
                    <div className="row justify-content-start" key={it._id}>
                        <div className="col-6">
                            
                            <p>{it.name}</p>
                            
                        </div>
                        <div className="col-6">
                        <Badge color="secondary" style={{cursor: 'pointer'}} onClick={()=>{handlesubtract(it.name,it.quantity)}}>-</Badge>
                           <span className="mx-2">{it.quantity}</span>
                        <Badge color="secondary" style={{cursor: 'pointer'}} onClick={()=>{handleadd(it.name,it.quantity)}}>+</Badge>
                        </div>
                    </div>
                )
            })
        }
       

        <div className="my-5 justify-content-start">

            <Button>Checkout</Button>
        </div>

        </div>
    )
}

export default Cart;
