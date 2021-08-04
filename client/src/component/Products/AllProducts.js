import React,{Fragment} from 'react'
import jsonData from './Data.json';
import {Link} from 'react-router-dom';

const AllProducts = () => {
    return (
        <Fragment>
            <div className="row">
            {jsonData.map(item => 
            <div className="card-group col-sm-4 mt-3" key={item.title} >
            <div className="card ">
            <img className="card-img-top" src={require(`./${item.imagename}`).default} alt={item.imagename} />
            <div className="card-body">
              <h5 className="card-title"><Link to={`/indproduct/${item.imagename}+${item.title}+${item.price} `}>{item.title}</Link></h5>
              <Link className="btn btn-primary">₹ {item.price} .00</Link>
            </div>
            </div>
            </div>
                )}
            </div>
         
        </Fragment>
    )
}

export default AllProducts;