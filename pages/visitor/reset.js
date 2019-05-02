import React from 'react'
import Head from '../../components/head'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import Router from 'next/router';
import { Navbar, NavLink } from 'reactstrap';


class Forgot extends React.Component {
    onSubmit = values => {
        axios({
            method: 'post',
            url: 'https://tigernest-backend.herokuapp.com/visitor/change-password',
            data: {
                "password": values.password,
                "resetToken": this.props.resetToken
            }
        })
        .then(resp => {
            console.log(resp)
            Router.push("/visitor/login");
        })
        .catch(err => alert('reset error'));
    };

    static getInitialProps({query}) {
        return {
            resetToken: query.resetToken
        };
    }

    render() {
        console.log(this.props);
        return (
            <div>
            <Head title="Reset Password" />
            <Navbar color="light" light expand="md">
                <ul>
                <li>
                    <NavLink href="/">
                    <a>Home</a>
                    </NavLink>
                </li>
                </ul>
                </Navbar>


            <div className="resetPWForm">
                <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>New Password:</label>
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    placeholder="New Password"
                                />
                            </div>
                            <button type="submit" disabled={submitting || pristine}>Reset Password</button>
                        </form>
                    )}
                />
            </div>
            <style jsx>{`
      .resetPWForm {
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

export default Forgot
