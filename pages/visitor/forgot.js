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
            url: 'http://localhost:5000/visitor/reset',
            data: {
                "email": values.email,
            }
        })
        .then(resp => {
            console.log(resp)
            alert('Reset sent! Check your email');
        })
        .catch(err => alert('reset error'));
    };

    render() {
        return (
            <div>
            <Head title="Forgot Password" />
            <Nav />
            <div className="forgotForm">
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
                            <button type="submit" disabled={submitting || pristine}>Reset Password</button>
                        </form>
                    )}
                />
            </div>
            <style jsx>{`
      .forgotForm {
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
