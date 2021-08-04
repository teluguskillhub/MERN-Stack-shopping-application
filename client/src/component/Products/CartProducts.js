import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteCart} from '../../action/cart';


const CartProducts = ({cart,deleteCart}) => {
    return (
        <Fragment>
        {cart.length>0?<Fragment>
            <h3>Cart Products</h3>
            <div className="row">
            {cart.map(item => 
            <div className="card-group col-sm-4 mt-3" key={item._id}>
            <div className="card ">
            <img className="card-img-top" src={require(`./${item.imagename}`).default} alt={item.imagename} />
            <div className="card-body">
              <h5 className="card-title"><Link to={`/indproduct/${item.imagename}+${item.title}+${item.price}+${item._id} `}>{item.title}</Link></h5>
              <Link className="btn btn-primary">₹ {item.price} .00</Link> &nbsp; &nbsp;
              <Link className="btn btn-primary" onClick={() => deleteCart(item._id)}>Remove cart</Link> 
            </div>
            </div>
            </div>
                )}
            </div>
        </Fragment>:<h2>Your Cart Is Empty, Kindly Add Products</h2>}
        </Fragment>
    )
}

CartProducts.propTypes = {
    cart : PropTypes.array.isRequired,
    deleteCart:PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    cart : state.cart,
})

export default connect(mapStateToProps,{deleteCart})(CartProducts);