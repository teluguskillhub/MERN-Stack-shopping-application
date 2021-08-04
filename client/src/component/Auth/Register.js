import React,{Fragment,useState} from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import setAlert  from '../../action/alert';
import { register } from '../../action/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        phone:'',
        address:'',
        state:'',
        city:'',
        pincode:''
      });
      const {name,email,password,password2,phone,address,state,city,pincode} = formData;
  
  let statesArr = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]
  let states = statesArr.map(state => <option value={state}>{state}</option>)

  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
        setAlert('Passwords do not match', 'danger');
    } else {
        register({ name, email, password,phone,address,state,city,pincode });
    }
    };
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
        }
    return (
        <Fragment>
            <div class="card text-center">
            <div class="card-header">
                Register
            </div>
            <div class="card-body mr-auto ml-auto">

            <form onSubmit={onSubmit} autoComplete="off">
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputname4">Name</label>
                <input type="text" name='name' value={name} onChange={onChange} class="form-control" id="inputname4" placeholder="Full Name" />
                </div>
                <div class="form-group col-md-6">
                <label for="inputphone4">Phone</label>
                <input type="text"  name='phone' value={phone} onChange={onChange} class="form-control" id="inputphone4" placeholder="Mobile Number" />
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group col-md-12">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control"  name='email' value={email} onChange={onChange} id="inputEmail4" placeholder="Email" />
                </div>
            </div>

            <div class="form-row">
                
            <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control"  name='password' value={password} onChange={onChange} id="inputPassword4" placeholder="Password" />
                </div>
                <div class="form-group col-md-6">
                <label for="inputconfirmpassword4">Confirm Password</label>
                <input type="password" class="form-control"  name='password2' value={password2} onChange={onChange} id="inputconfirmpassword4" placeholder="Confirm Password" />
                </div>
            </div>

            <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control"  name='address' value={address} onChange={onChange} id="inputAddress" placeholder="Full Address" />
            </div>
            <div class="form-row">
                <div class="form-group col-md-5">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control"  name='state' value={state} onChange={onChange}>
                        <option selected>Choose...</option>
                        {states}
                    </select>
                    </div>
                <div class="form-group col-md-5">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity"  name='city' value={city} onChange={onChange}  placeholder="City" />
                </div>
                
                <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip"  name='pincode' value={pincode} onChange={onChange}  placeholder="ZipCode "/>
                </div>
            </div>
           <div class="form-group">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    Already register ? <Link to="/login">Login</Link> here
                </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            </form>

            </div>
            </div>
            
        </Fragment>
    )
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { setAlert, register })(Register);
  