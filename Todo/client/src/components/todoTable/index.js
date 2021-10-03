import React,{useEffect,useContext, useState} from 'react'
import
 { Table,
   TableContainer, 
   TableHead,
   TableRow,
   TableCell,
   TableBody ,
   Paper,
   Button,
   FormControl,
   InputLabel,
   Select,
   MenuItem
} from '@material-ui/core'
import axios from 'axios'
import {globalContext} from '../../containers/context'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

function TodoInfo() {
    
    const {token,setToken} = useContext(globalContext)
    const [allTodos,setAllTodos] = useState()
    const [update,setUpdate] = useState(false)
    const [tableState,setTableState] = useState(false)
    const [selectorValue,setSelectorValue] = useState("done")


    useEffect(()=>{
        const headers = {
            "Authorization": token
        }
        axios.get('http://localhost:2000/api/get-todo',{headers})
        .then(res=>setAllTodos(res.data.data))

    },[update])



    const handleClick = ()=>{
        localStorage.clear()
        setToken("")
    }

   

    const handleUpdate=(id)=>{

        console.log(id)
        
        if(!id){
            return
        }
        const headers = {
            "Authorization": token
        }
        axios.post(`http://localhost:2000/api/update-todo/${id._id}`,{status:false},{headers})
        .then(res=>setUpdate(!update))
    }

    const handleUpdate1=(id)=>{

        
        if(!id){
            return
        }
        const headers = {
            "Authorization": token
        }
        axios.post(`http://localhost:2000/api/update-todo/${id._id}`,{status:true},{headers})
        .then(res=>setUpdate(!update))
    }

    const handleChange = (e)=>{
        setTableState(e.target.value)
        setSelectorValue(e.target.value)
    }

    const handleDelete = (e)=>{
        const headers = {
            "Authorization": token
        }
        axios.get(`http://localhost:2000/api/delete-todo/${e._id}`,{headers})
        .then(res=>setUpdate(!update))
    }

    return (
        <div>
            {!token&&<Redirect to='/'></Redirect>}

        <div>
            
        <FormControl>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={selectorValue}
                onChange={handleChange}
            >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="done">Done</MenuItem>
            </Select>
            </FormControl>

        </div>


            {tableState=="pending"?
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>CreatedAt</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTodos?.map((i,idx)=>{
                            if(i.status==false){
                            return(
                            
                               <TableRow key={idx}>
                                    <TableCell>
                                        {i.name}
                                    </TableCell>
                                    <TableCell>
                                        {i.description}
                                    </TableCell>
                                    <TableCell>
                                        {i.time}
                                        {console.log("=>",i.status)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color={i.status?"":"primary"} onClick={()=>handleUpdate(i)}>Inprograss</Button>&nbsp;
                                        <Button  variant="contained" color={i.status?"primary":""} onClick={()=>handleUpdate1(i)}>Done</Button>&nbsp;
                                        <Button  variant="contained" color="secondary" onClick={()=>handleDelete(i)}>Delete</Button>
                                    </TableCell>
                                </TableRow> 
                            )
                        }
                        })}
                   
                    </TableBody>
                 </Table>
            </TableContainer>
            : <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>CreatedAt</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {allTodos?.map((i,idx)=>{
                        if(i.status==true){

                            return(
                                <TableRow key={idx}>
                                    <TableCell>
                                        {i.name}
                                    </TableCell>
                                    <TableCell>
                                        {i.description}
                                    </TableCell>
                                    <TableCell>
                                        {i.time}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color={i.status?"":"primary"} onClick={()=>handleUpdate(i)}>Inprograss</Button>&nbsp;
                                        <Button  variant="contained" color={i.status?"primary":""} onClick={()=>handleUpdate1(i)}>Done</Button>&nbsp;
                                        <Button  variant="contained" color="secondary" onClick={()=>handleDelete(i)}>Delete</Button>

                                    </TableCell>
                                </TableRow> 
                            )

                        }
                        
                    })}
               
                </TableBody>
             </Table>
        </TableContainer>}
            <Button
            variant="contained"
            color="primary"
            style={{marginTop:"20px"}}
            onClick={handleClick}>
                Logout
            </Button>&nbsp;
            <Button
            variant="contained"
            color="primary"
            style={{marginTop:"20px"}}
          >
                <Link to="/dashboard" style={{color:"white"}}>Back</Link>
            </Button>
           
        </div>
    )

}

export default TodoInfo
