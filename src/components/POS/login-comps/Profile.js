import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {asyncUserInfo} from '../../../actions/userInfoAction'
import '../dashboard-comps/dash-comps.css'

const Profile=(props)=> {

    const dispatch=useDispatch();
    
    const info=useSelector((store)=>{
        return store.userInfo;
    })

    // console.log(info,'from profile comp');

    useEffect(()=>{
        dispatch(asyncUserInfo());
    },[])


    return (
<section>
    <div className=" container m-5 ">
    
        <div className="row">
            <div className="offset-md-4 offset-1 col-8 col-md-6">
                <div className="card border border-dark shadow-lg text-center cardPosition">
            <div className="card-header ">
                 User Profile
            </div >
            <div className="card-body">
                <h5 className="card-title">Username - {info.username} </h5>
                <h5 className="card-title">Email - {info.email} </h5>
                <h5 className="card-title">Business Name - {info.businessName} </h5>
                <h5 className="card-title">Address - {info.address}</h5> 
            </div>
            <div className="card-footer text-muted">
            POS - billing application
            </div>
        </div>
            </div>
        </div>
</div>
</section>
    )
}

export default Profile