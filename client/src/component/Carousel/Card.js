import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';

const Card = () => {
    return (
        <Fragment>
                <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Trending Andriod and IOS Mobile Phones</h5>
                        <p className="card-text">Click here to check out top trending andriod and ios mobile phones.</p>
                        <Link className="btn btn-primary">Check Out</Link>
                    </div>
                    </div>
                </div> 
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Trending Laptops and Pcs</h5>
                        <p className="card-text">Click here to check out top trending windows, ubuntu and ios laptops,pcs.</p>
                        <Link className="btn btn-primary">Check Out</Link>
                    </div>
                    </div>
                </div> 
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Trending accessories and Gadgets</h5>
                        <p className="card-text">Click here to check out top trending accessories and Gadgets from multiple brands.</p>
                        <Link  className="btn btn-primary">Check Out</Link>
                    </div>
                    </div>
                </div>
                </div>
        </Fragment>
    )
}

export default Card;