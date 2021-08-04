import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart} from '../../action/cart';
import {deleteCart} from '../../action/cart';

const IndProduct = ({match,cart,user,addToCart,deleteCart,address}) => {
    let data = match.params.data.split('+')
    let title = data[1];let price=data[2] ; let imagename = data[0];
    //let id = data[3] && '';
    let exist = cart.filter(item => item.title === title).length > 0;
    let id = exist && cart.filter(item => item.title === title)[0]._id;
    return (
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="card col-sm-3" style={{"width": "18rem"}}>
            <img className="card-img-top" src={require(`./${imagename}`).default} alt={imagename} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link to='/' className="btn btn-primary">price : ₹ {price}.00</Link> <br /> 
            </div>
            </div>
            <div className="col-sm-6">
            <div className="card text-center">
            <div className="card-header">
            About product description
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <hr />
                <Link to={`/placeorder/${title}+${imagename}+${price}+${address}`} className="btn btn-primary">Order</Link> &nbsp;
                {exist ?
                <button className="btn btn-primary" onClick={() => deleteCart(id)}>Remove cart</button>:
                <button className="btn btn-primary" onClick={() => addToCart({user,title,price,imagename})}>Add to cart</button>}
            </div>
            <div className="card-footer text-muted">
                Delivery can be expect with in next 7 working days !!
            </div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    cart : state.cart,
    user : state.auth.user._id,
    address : state.auth.user.address
})

export default connect(mapStateToProps,{addToCart,deleteCart})(IndProduct);