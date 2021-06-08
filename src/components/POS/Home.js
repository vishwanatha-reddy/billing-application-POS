import React from 'react'


const Home=(props)=> {
    return (
        <div className="container ">
           
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
                <div className="col-6 offset-3 text-center justify-content-center">
                    <h3 className="mt-5">Credentials to sign into application</h3>
                    <div>
                        <h4 className="d-inline">Email id</h4> - <h5 className="d-inline">vreddym@gmail.com</h5>
                    </div>
                    <div>
                        <h4 className="d-inline">Password</h4> - <h5 className="d-inline" >vreddym@123</h5>
                    </div>
                    <h5 className="mt-3">Please navigate to the Login page, and enter above credentials to explore the application.</h5>
                </div>
            </div>
        </div>
    )
}

export default Home
