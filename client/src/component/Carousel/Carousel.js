import React,{Fragment} from 'react';
import banner1 from './hd1.jpg';
import banner2 from './hd3.jpg';
import banner3 from './hd2.jpg';
import Card from './Card';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

const Carousel = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }
    return (
        <Fragment>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" src={banner1} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src={banner2} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src={banner3} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div> 
                <br />

                <Card />   

        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
})
export default connect(mapStateToProps)(Carousel);