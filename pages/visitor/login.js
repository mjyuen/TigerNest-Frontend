import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import Router from 'next/router';
import Link from 'next/link';
import { Navbar, NavLink } from 'reactstrap';



class Register extends React.Component {
    onSubmit = values => {
        axios({
            method: 'post',
            url: 'https://tigernest-backend.herokuapp.com/visitor/login',
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
        .catch(err => alert('There was an error logging in. Please make sure you have created an account and are typing the same login credentials.'));
    };

    render() {
        return (
            <div>
            <Head title="Login" />
            <Navbar color="light" light expand="md">
                <ul>
                <li>
                    <NavLink href="/">
                    <a>Home</a>
                    </NavLink>
                </li>
                </ul>
                </Navbar>

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
      :global(body) {
        margin: 0;
        background: url("/static/background.jpg");
        background-size: cover;

        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }

 
    `}</style>
    </div>
        )
    }
}

export default Register
