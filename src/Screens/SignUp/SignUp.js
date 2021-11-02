import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
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

const Form = (props) => {
    const classes = useStyles();
    // create state variables for each input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const getSignUp = (obj) => {
        return axios.post('http://localhost:4000/api/users', obj)
            .then(data => {
                console.log(data.data)
                localStorage.setItem('passwordddd', JSON.stringify(data.data.password));
                props.history.push('/');

            })
            .catch((error) => {
                setError(error.response.data);
                setTimeout(function () { setError('') }, 5000);
                return error.response.data;
            });
    }
    // email: "testFhkjhkhkjor@s.in"
    // name: "Ashish Kumar jkjhk Singh"
    // password: "$2b$10$gNVJPibcmhWNP9un7twhVuLozgriBbtmuM..7UjIVv7v01vCnPnRu"
    // __v: 0
    // _id: "617af45479653c8b2e0479e5"
    const handleSubmit = e => {
        e.preventDefault();
        console.log(firstName, lastName, email, password);
        getSignUp({ name: `${firstName} ${lastName}`, email, password });
        console.log("returned")

    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <h2>Sign Up Page</h2>
            <TextField
                label="First Name"
                variant="filled"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <TextField
                label="Last Name"
                variant="filled"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
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
                    <Link style={{ textDecoration: "none" }} to="/">Cancel</Link>
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </div>
            <p>{error}</p>
        </form>
    );
};

export default Form;