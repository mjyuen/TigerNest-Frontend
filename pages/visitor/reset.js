import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import Router from 'next/router';

class Forgot extends React.Component {
    onSubmit = values => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/visitor/change-password',
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
            <Nav />
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
 
    `}</style>
            </div>
        )
    }
}

export default Forgot
