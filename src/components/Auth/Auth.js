import { Avatar, Button, Container, Grid,  Paper, Typography } from '@material-ui/core'
import React,{useState} from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import  jwtDecode  from "jwt-decode";
import Input from './Input';
import Icon from './Icon';
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import {signUp,signIn} from '../../actions/auth';
const Auth = () => {
    const state=null
    const dispatch=useDispatch()
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const classes = useStyles();
    const [formData,setFormData]=useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();
    const handleShowPassword = () => setShowPassword(!showPassword);
    const googleSuccess = async (res) => {
       const result=jwtDecode(res.credential)
        let token=result?.sub
      
        try {
          if(result)dispatch({type:"AUTH",data:{result,token}})
          navigate('/')
          
        } catch (error) {
          
        }
  };

  const googleError = (error) => console.log('Google Sign In was unsuccessful',error);

    const switchMode = () => {
        // setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('formData',formData)
      if(isSignup){
         dispatch(signUp(formData,navigate))
      }else{
        dispatch(signIn(formData,navigate))
      }

    };
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
 <>
     <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
          onError={googleError}
            onSuccess={googleSuccess}

          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>

       </Paper>
    </Container>
 </>
  )
}

export default Auth