import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';


function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({name:'', email:'', password:''});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = (async() => {
    const response = await axios.get('http://localhost:8000/')
    setUsers(response.data);
  })

  const getUserById =  (async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    setUser(response.data);
    setEdit(true);
  })

  const createOrEditUser = (async (user) => {
    if (user.id) {
      await axios.put(`http://localhost:8000/?id=${user.id}`, user)
    }
    else {
      await axios.post('http://localhost:8000/', user)
    }
    getAllUsers();
    setUser({name:'', email:'', password:''});
    setEdit(false);
  })

  const deleteUser = (async (user) => {
    await axios.delete(`http://localhost:8000/?id=${user.id}`)
    getAllUsers();
  })

  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Box m = {10}>
      <TableContainer component={Paper}>
        <TableBody sx={{ minWidth: 650 }}>
          <TableRow>
            <TableCell>
              <TextField value={user.name} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setUser({...user, name:e.target.value})} />
            </TableCell>
            <TableCell>
              <TextField value={user.email} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUser({...user, email:e.target.value})}/>
            </TableCell>
            <TableCell>
              <TextField value={user.password} id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setUser({...user, password: e.target.value})}/>
            </TableCell>
            <TableCell>
              <Button variant="contained" color="success" onClick={() => createOrEditUser(user)}>
                {edit ? 'Edit User' : 'Add User'}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">
                <Button variant="contained" onClick={() => getUserById(row.id)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteUser(row)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
      
    </div>
  );
}

export default App;
