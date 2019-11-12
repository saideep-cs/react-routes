/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Switch,Redirect} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
 export default class Dashboard extends React.Component{
     constructor(props){
        super(props)
        this.state={
            isauth:false,
            render:<LoadingComponent/>
        }
        this.logoutHandler=this.logoutHandler.bind(this);
     }
     async logoutHandler () {
        let result = await axios.delete ('/user-session');
        console.log (result);
        this.setState ({isauth: false, render: <Redirect to="/login" />});
      }
     async componentDidMount(){
        try{
            let r=[]
            const callApi=async ()=>{
                    r="Welcome to contentstack dashboard"
                this.setState({r:r})
            }
            try{
                callApi()
            }catch{
                console.log("Error at api")
            }
               this.setState({isauth:true})
        }catch{
            console.log("from catch");
        }
    }

 render(){
    let t=this.state.render
    if(this.state.isauth){
        return(
            <React.Fragment>
                <div className="message-display">{this.state.r}</div>
            {this.props.routes?
           <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
               </React.Fragment>
            )
    }
    else{
        return(
            <Fragment>
                {t}
            </Fragment>
        )
    }
}
 }