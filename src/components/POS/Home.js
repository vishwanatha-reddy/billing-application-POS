import React from 'react'
import './Home.css'

const Home = (props) => {
    return (
        <div className="container " >
     
             <div className="row">
                <div className="col-md-10 offset-2 ">
                    
            <div className="jumbotron jumbotron-fluid border border-dark m-5 py-5 px-3 rounded bg-success text-white" style={{width:'80%',backgroundColor:'red'}}>
                    <div className="container ">
                        <h1 className="display-4">VRM Billing Application</h1>
                        <p className="lead" style={{marginLeft:'15rem'}}>- Welcome! to Point Of Sales Billing Application.</p>
                    </div>
                    </div>
            </div>
            </div>
            <div className="row ">
                <div className="col-4 offset-4 text-center text-white justify-content-center">

                    <div className="card text-center">
                        <div className="card-header bg-dark text-white h3">Login Credentials</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">Email id : vreddym@gmail.com </h5>
                            <h5 className="card-title">Password : vreddym@123 </h5>
                            <p className="card-text ">
                                Please navigate to the Login page, and enter above credentials to explore the application
                            </p>
                            
                        </div>
                        <div className="card-footer bg-dark text-dark">I</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
