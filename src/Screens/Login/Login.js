import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const getLogin = (obj) => {
        return axios.post('http://localhost:4000/api/auth', obj)
            .then(data => {
                console.log(data.data)
                props.history.push('/home');

            })
            .catch((error) => {
                setError(error.response.data);
                setTimeout(function () { setError('') }, 5000);
                return error.response.data;
            });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password);
        getLogin({ email, password });
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <h2>Login Page</h2>
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <Button variant="contained">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    LogIn
                </Button>
            </div>
            <div>
                <p><Link to="/">Forgot Password!</Link></p>
                <p>
                    Don't have a accont  <Link to="/signup"> Sign Up</Link>
                </p>
            </div>
            <p>{error}</p>
        </form>

    );
};

export default Login;