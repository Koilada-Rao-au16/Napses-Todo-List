import React,{useContext,useState} from 'react'
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {globalContext} from '../../containers/context'
import {Redirect,Link} from 'react-router-dom'


function Dashboard() {

    const {token,setToken} = useContext(globalContext)

    const [error,setError] = useState("")
    const[formValues,setFormValues] = useState({})

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormValues({
          ...formValues,  
          [name] : value  
        })
      } 

    const handleClick = ()=>{
        localStorage.clear()
        setToken("")
    }

    const handleClickTodo = ()=>{

        const headers = {
            "Authorization": token
        }

        axios.post('http://localhost:2000/api/add-todo',formValues,{headers})
        .then(res=>{
            if(res.data.error){
                return setError(res.data.error)
            }
            setError("")
        })

    }

    return (
        <div>
            {!token&&<Redirect to="/"/>}

            <Typography component="h1" variant="h5">
            Add Todo
            </Typography>
            <Link to="/todos">MY Todos</Link>
            {error&& 
            <Typography style={{color:"red"}}>
            {error}
            </Typography>}


            <div style={{display:'flex', flexDirection: 'column',marginLeft:"452px",width:"266px"}}>

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="password"
                autoFocus
                onChange={(e)=>handleInputChange(e)}
                />

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="password"
                autoFocus
                onChange={(e)=>handleInputChange(e)}
                />

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="time"
                label="Time"
                type="time"
                id="password"
                autoFocus
                onChange={(e)=>handleInputChange(e)}
                />
            </div>

            <Button
            variant="contained"
            color="primary"
            onClick={handleClickTodo}>
                Add Todo
            </Button>&nbsp;

            <Button
            variant="contained"
            color="primary"
            onClick={handleClick}>
                Logout
            </Button>
            

        </div>
    )
}

export default Dashboard
