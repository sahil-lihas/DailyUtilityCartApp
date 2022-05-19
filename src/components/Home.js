import React from 'react'
import bread from '../Bread.jpg'
import eggs from '../eggs.jpg'
import cheese from '../cheese.jpeg'
import milk from '../milk.jpg'
import {Card, CardImg, CardBody, CardTitle, Button, CardHeader} from 'reactstrap';
import AddItem from './Additem';

const items = [
    {
        name: 'Organic Bread',
        image: bread
    },
    {
        name: 'Farm Fresh Eggs',
        image: eggs
    },
    {
        name: 'Dairy Cheese',
        image: cheese
    },
    {
        name: 'Pure Milk',
        image: milk
    },
    {
        name: 'Cookies',
        image: 'https://live.staticflickr.com/65535/48993897996_6d6199c799_o.jpg'
    }
]


function Home(props) {
    return(
        <div className="container my-4">
            <div className="row">
            {items.map((item,index)=>{
                return(
                    <div className="col-3 my-4" key={index}>
                    <Card>
                        <CardHeader>
                            <p className="text-center">
                                {item.name}
                            </p>
                        </CardHeader>
                        <CardImg src={item.image} />
                        <CardTitle />
                        <CardBody>
                            <AddItem itemname={item.name}/>
                        </CardBody>
                    </Card>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Home;
