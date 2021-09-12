
import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";


async function loginUser(user,pass) {
  
    const CorsUrl="https://cba-cors.herokuapp.com/"
     const BaseUrl="https://cba-adminws-dev.herokuapp.com/"
    return fetch(CorsUrl+BaseUrl+'/api/v1/user', {
      method: 'GET',
      headers: {
        'username': user,
        'password': pass
      },
      
    })
      .then(data => data.json())
   }


   function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.quartciphers.in/" target='_blank'>
          QC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));






export default  function Login({ setToken }){
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false);
   
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = await loginUser(
          username,
          password
        );
        
        if(token.CredentialMatch){
            setToken(username);
            
           window.location.reload()
           
        }else{
          setLoading(false);
          return alert("Wrong Credentials : Invalid Username / Password") 
          
            

        }
        
        e.reset();
        
         
      }


      if(loading){
        return  (
          <div class="container-fluid ">
            <div class="text-center ">
              <p className="font-weight-bold h1">Verifying User Credentials</p>
            <div class="spinner-border " role="status">
              <span class="sr-only">Loading...</span> 
            </div>
             </div>

          </div>
         
        
        )
    }
     
 
 
 
    return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SupervisorAccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Panel
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => setUserName(e.target.value)} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            InputProps={{ 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
         
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    )
       
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

