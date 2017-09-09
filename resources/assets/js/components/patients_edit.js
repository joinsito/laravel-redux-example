import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { fetchPatient, editPatient } from '../actions/index';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const renderField = ({label, value, input,placeholder,name,meta: { touched, error, warning }}) => (
    <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type="text" placeholder={placeholder}/>
        {touched && error &&
        <span className="error">{error}</span>}
    </div>
)
class PatientsEdit extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount() {
        this.props.fetchPatient(this.props.match.params.id);
    }
    onSubmit(props) {
        this.props.editPatient(props.id,props)
            .then((result) => {
                if (result.error!==true) {
                    // Navigate to reports list
                    this.context.router.history.push('/patients');
                }else {
                    // Error saving report
                    alert('There was an error saving the patient');
                }
            });
    }
    render() {
        const { patient, initialValues, handleSubmit } = this.props;
        if (patient==null) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit Patient</h3>
                <Field name="name" component={renderField} type="text" label="Username" placeholder="Username"/>
                <Field name="password" component={renderField} type="text" label="New Password" placeholder="New Password"/>
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

PatientsEdit =  reduxForm({
    form: 'PatientsEditForm',
    fields: ['name','password','email'],
    validate
})(PatientsEdit);

function mapStateToProps(state) {
    return {
        patient: state.patients.patient,
        initialValues: state.patients.patient
    };
}

export default withRouter(connect(mapStateToProps,{ fetchPatient, editPatient })(PatientsEdit));
