import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import { Navbar, NavLink } from 'reactstrap';
import Router from 'next/router';



class Register extends React.Component {
    onSubmit = values => {
        console.log(values)
        axios({
            method: 'post',
            url: 'https://tigernest-backend.herokuapp.com/visitor',
            data: {
                "gender": values.gender,
                "name": values.name,
                "same_gender": values.same_gender,
                "university": values.university,
                "email": values.email,
                "password": values.password
            }
        })
        .then(resp => {
            // set local storage on browser
            if (process.browser)
                localStorage.setItem("token", resp.data.access_token);
            alert('Registered!');
            Router.push("/visitor/login");


        })
        .catch(err => alert('Sorry, there was an error processing your registration. If you already have an account with us, please login instead. '));
    };

    render() {
        return (

            <div>
            <Head title="Register" />
            <Navbar color="light" light expand="md">
                <ul>
                <li>
                    <NavLink href="/">
                    <a>Home</a>
                    </NavLink>
                </li>
                </ul>
                </Navbar>

            <div className="regForm">
                <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <label>Gender:</label>
                                <Field name="gender" component="select">
                                    <option />
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    </Field>
                            </div>
                            <div>
                                <label>Are you comfortable rooming with someone of the opposite gender?:</label>
                                <Field name="same_gender" component="select">
                                <option />
                                <option value="False">Yes</option>
                                <option value="True">No</option>
                                </Field>
                            </div>
                            <div>
                                <label>University: </label>
                                <Field
                                    name="university"
                                    component="input"
                                    type="text"
                                    placeholder="University"
                                />
                            </div>
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
            </div>
            <style jsx>{`
      .regForm {
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
