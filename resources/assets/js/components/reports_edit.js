import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { fetchReport, editReport, fetchPatients } from '../actions/index';
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
                                {`Test name #${index + 1}`}
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
                </div>
            </div>
        )}
    </div>
)
class ReportsEdit extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount() {
        this.props.fetchReport(this.props.match.params.id);
        this.props.fetchPatients();
    }
    onSubmit(props) {
        this.props.editReport(props.id,props)
            .then((result) => {
                if (result.error!==true) {
                    // Navigate to reports list
                    this.context.router.history.push('/reports');
                }else {
                    // Error saving report
                    alert('There was an error saving the report');
                }
            });
    }
    renderSelectOptions = (patient,id) => (
        <option key={patient.id} value={patient.id}>{patient.name}</option>
    )
    render() {
        const { report, initialValues, handleSubmit } = this.props;
        if (report==null) {
            return (
                <div>Loading...</div>
            )
        }
        if (this.props.patients.all.length==0) {
            return (
                <div>Loading...</div>
            );
        }
        console.log(this.props.patients.all);
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit Report</h3>
                <Field name="title" component={renderField} type="text" label="Title" placeholder="Title"/>
                <div className="form-group">
                    <label>Patient</label>
                    <Field className="form-control" name="user" type="select" label="User" component="select">
                        {_.map(this.props.patients.all,this.renderSelectOptions.bind(this))}
                    </Field>
                </div>
                <FieldArray name="tests" component={renderTests} />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.username = 'Enter an username';
    }

    return errors;
}

ReportsEdit =  reduxForm({
    form: 'ReportsEditForm',
    fields: ['title','user_id'],
    validate
})(ReportsEdit);

function mapStateToProps(state) {
    return {
        report: state.reports.report,
        patients: state.patients,
        initialValues: state.reports.report
    };
}

export default withRouter(connect(mapStateToProps,{ fetchReport, editReport, fetchPatients })(ReportsEdit));
