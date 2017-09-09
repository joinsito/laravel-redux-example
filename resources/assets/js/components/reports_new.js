import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { createReport, fetchPatients } from '../actions/index';
import {PropTypes} from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

const renderField = ({label,input,placeholder,name,meta: { touched, error, warning }}) => (
    <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type="text" placeholder={placeholder} />
        {touched && error &&
        <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="alert alert-danger">{error}</span>
        </div>
        }
    </div>
)
const renderTests = ({ fields, meta: { error }}) => (

    <div className="form-group">
        <div >
            <a className="btn btn-default" type="button" onClick={() => fields.push()}>
                Add Test
            </a>
        </div>
        {fields.map((test, index) =>
                <div className="row" key={index}>
                    <div className="col-lg-5">
                        <div className="input-group">
                            <span className="input-group-addon">
                                {`Test #${index + 1}`}
                            </span>
                                <Field
                                    name={`tests[${index}]['name']`}
                                    type="text"
                                    component={renderField}
                                />
                        </div>
                    </div>
                    <div className="col-lg-5">
                            <div className="input-group">
                            <span className="input-group-addon">
                                {`Test Result #${index + 1}`}
                            </span>
                                <Field
                                    name={`tests[${index}]['result']`}
                                    type="text"
                                    component={renderField}
                                />
                            </div>
                    </div>
                    <div className="col-lg-2">
                        <span className="glyphicon glyphicon-remove btn btn-default" aria-hidden="true" onClick={() => fields.remove(index)}></span>
                    </div>
                </div>
        )}
    </div>
)



class ReportsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount() {
        this.props.fetchPatients();
    }
    onSubmit(props) {
        this.props.createReport(props)
            .then((result) => {
                if (result.error!==true) {
                    // Navigate to reports list
                    this.context.router.history.push('/reports');
                }else {
                    // Error saving report
                    alert('There was an error adding the report');
                }
            });
    }
    renderSelectOptions = (patient,id) => (
        <option key={patient.id} value={patient.id}>{patient.name}</option>
    )
    render() {
        const { fields: {title}, handleSubmit } = this.props;
        if (this.props.patients.all.length==0) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Report</h3>
                <Field name="title" component={renderField} type="text" label="Title" placeholder="Title"/>
                <div className="form-group">
                    <label>Patient</label>
                    <Field className="form-control" name="user" type="select" label="Patient" component="select">
                        {_.map(this.props.patients.all,this.renderSelectOptions.bind(this))}
                    </Field>
                </div>
                <FieldArray name="tests" component={renderTests} />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    }

    return errors;
}

ReportsNew =  reduxForm({
    form: 'ReportsNewForm',
    fields: ['title'],
    validate
})(ReportsNew);

function mapStateToProps(state) {
    return { patients: state.patients };
}

export default withRouter(connect(mapStateToProps,{ createReport, fetchPatients })(ReportsNew));
