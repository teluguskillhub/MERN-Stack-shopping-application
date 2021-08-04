import React,{ Fragment,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToOrder} from '../../action/order';

const PlaceOrder = ({ match,user,addToOrder }) => {
    let data = match.params.data.split('+')
    let paramstitle = data && data[0];
    let paramsimagename = data && data[1];
    let paramsprice = data && data[2];
    let paramsaddress = data && data[3];
    const [flag,setFlag] = useState(0);
    const [formData,setFormData] = useState({
        title:paramstitle,
        imagename:paramsimagename,
        price : paramsprice,
        address : paramsaddress
    });
    let {title,imagename,price,address} = formData;
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const [toggle,setToggle] = useState(false);
    const [alter,setAlter] = useState('');
    const alterChange = e =>{
        setAlter(e.target.value);
    }
  
    const onSubmit = e =>{
        setFlag(1)
        window.alert("Your Order Placed Successfully")
        e.preventDefault();
        if(toggle){
            address = alter;
            addToOrder({user,title,imagename,price,address});
           setAlter('');
        }
        else{
            addToOrder({user,title,imagename,price,address});
            setAlter('');
        }
        
    }
    console.log("flag",flag);
    if(flag === 1){
        return <Redirect to='/order' />
    }
   
    return (
        <Fragment>
            <div className="card text-center">
            <div className="card-header">
                Place Your Order
            </div>
            <div className="card-body mr-auto ml-auto">

            <form onSubmit={onSubmit}>
            <div className="form-group" >
                {!toggle && <Fragment>
                    <div className="form-check">
                        <input type="checkbox"  name='address' value={address} onChange={onChange}  className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">{address} (Registered address as delivery address)</label>
                    </div>
                    </Fragment>}
            
                <label for="exampleInputText1"><strong>Note : </strong>If you need to change delivery address, Please <Link onClick={()=> setToggle(!toggle)}>click here</Link></label>
               { toggle && 
               <Fragment>
               <input type="text"  name='alter' value={alter} onChange={alterChange}  className="form-control" id="exampleInputText1" aria-describedby="textHelp" placeholder="Enter New Delivery Address" />
                <small id="textHelp" className="form-text text-muted">Kindly Provide Valid Delivery Address.</small>
                </Fragment>}
            </div>
            <button type="submit" className="btn btn-primary">Confirm Order</button>
            </form>


            </div>
            </div>
            
        </Fragment>
    )
}


  
  const mapStateToProps = state => ({
    user : state.auth.user._id,
  });
  
  export default connect(mapStateToProps, { addToOrder })(PlaceOrder);
  