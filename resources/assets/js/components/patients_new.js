import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { createPatient } from '../actions/index';
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";

const renderField = ({label,input,placeholder,name,meta: { touched, error, warning }}) => (
    <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type="text" placeholder={placeholder} />
        {touched && error &&
        <span className="error">{error}</span>}
    </div>
)

class PatientsNew extends Component {
    onSubmit(props) {
        this.props.createPatient(props)
            .then((result) => {
                if (result.error!==true) {
                    // Navigate to reports list
                    this.context.router.history.push('/patients');
                }else {
                    // Error saving report
                    alert('There was an error adding the patient');
                }
            }).catch((result) => {
                alert('There was an error adding the patient');
        });
    }
    render() {
        const { fields: {username,password,email}, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Patient</h3>
                <Field name="name" component={renderField} type="text" label="Name" placeholder="Name"/>
                <Field name="username" component={renderField} type="text" label="Username" placeholder="Username"/>
                <Field name="password" component={renderField} type="text" label="Password" placeholder="Password"/>
                <Field name="email" component={renderField} type="text" label="Email" placeholder="Email"/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Enter an username';
    }

    if (!values.password) {
        errors.password = 'Enter a password';
    }


    if (!values.email) {
        errors.email = 'Enter an email';
    }

    return errors;
}
static contextTypes = {
    router: PropTypes.object
};
PatientsNew =  reduxForm({
    form: 'PatientsNewForm',
    fields: ['username','password','email'],
    validate
})(PatientsNew);

export default connect(null,{ createPatient })(PatientsNew)
