import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { Button, ButtonGroup } from 'reactstrap'
import axios from 'axios';
import { Form, Field } from 'react-final-form'

class Register extends React.Component {
    onSubmit = values => {
        console.log(values)
        axios({
            method: 'post',
            url: 'http://localhost:5000/visitor',
            data: {
                "gender": values.gender,
                "name": values.name,
                "same_gender": false,
                "university": values.university,
                "email": values.email,
                "password": values.password
            }
        })
        .then(resp => {
            console.log(resp)
            // set local storage on browser
            if (process.browser)
                localStorage.setItem("token", resp.data.access_token);
        })
        .catch(err => alert('Registration Error'));
    };

    render() {
        return (

            <div>
            <Head title="Register" />
            <Nav />
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
 
    `}</style>
            </div>
        )
    }
}

export default Register
