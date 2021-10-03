import React,{useContext,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom'

import {useStyles} from './style.js'
import { globalContext } from '../../containers/context';


const SignUp=()=>{
  const classes = useStyles();

const {token,setToken} = useContext(globalContext);

const [error,setError] = useState("")
const[formValues,setFormValues] = useState({})

const handleInputChange = (e)=>{
  const {name,value} = e.target;
  setFormValues({
    ...formValues,  
    [name] : value  
  })
} 

const handleSubmit = (e)=>{
  e.preventDefault()

  axios.post('http://localhost:2000/api/registor',{...formValues})
  .then(res=>{
    // console.log
    if(res.data.error){
      return setError(res.data.error)
    }
    setError("")
    setToken(res.data.data)
    setFormValues({})

  })
}

  return (
    <div>

      {token&& <Redirect to='/dashboard'></Redirect> }

      <Container component="main" maxWidth="xs">
        
        <CssBaseline />

        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <form className={classes.form} validate>

            {error &&
              <Typography component="h1" variant="subtitle1" style={{color:"red"}}>
              {error}
            </Typography>}


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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=>handleInputChange(e)}
            />

          

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>handleInputChange(e)}
            />


            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={(e)=>handleInputChange(e)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleSubmit}
            >
              Sign Up
            </Button>
            
            <Grid container>
              <Grid item>
                <Link to='/' variant="body2">
                  {"have an account? Login"}
                </Link>
              </Grid>
            </Grid>

        
          </form>
        </div>
    
      </Container>

    </div>
  );

}

export default SignUp;