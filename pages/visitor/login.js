import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import Router from 'next/router';
import Link from 'next/link'


class Register extends React.Component {
    onSubmit = values => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/visitor/login',
            data: {
                "email": values.email,
                "password": values.password
            }
        })
        .then(resp => {
            console.log(resp)
            alert('logged in!');
            // set local storage on browser
            if (process.browser)
                localStorage.setItem("token", resp.data.access_token);
            
            Router.push("/visitor/eventSelect");
        })
        .catch(err => alert('Login Error'));
    };

    render() {
        return (
            <div>
            <Head title="Login" />
            <Nav />
            <div className="loginForm">
                <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Email:</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button type="submit" disabled={submitting || pristine}>Submit</button>
                        </form>
                    )}
                />
                    <Link href="/visitor/forgot">
                        <a>Forgot password?</a>
                    </Link>{' '}
            </div>
            <style jsx>{`
      .loginForm {
        width: 300px;
        background-color: white;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10%;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: .5rem;
        padding-right: .5rem;
      }
 
    `}</style>
            </div>
        )
    }
}

export default Register
