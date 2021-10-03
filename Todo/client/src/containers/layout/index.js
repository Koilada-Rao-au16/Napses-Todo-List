import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Store from '../context'
import Login from '../../components/login'
import Signup from '../../components/signUp'
import Todo from '../../components/todo'
import TodoInfo from '../../components/todoTable'
function Layout() {
    return (
        <div>
            <Store>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/register"  component={Signup}/>
                        <Route path="/dashboard"  component={Todo}/>
                        <Route path="/todos"  component={TodoInfo}/>
                    </Switch>
                </Router>
            </Store>
           
        </div>
    )
}

export default Layout
