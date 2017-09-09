import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPatients } from "../actions";

class PatientsIndex extends Component {
    componentWillMount() {
        this.props.fetchPatients();
    }
    renderPatients() {
        // Renders each user item
        return _.map(this.props.patients.all, patient => {
            if (patient!==null) {
                return (
                    <tr className="row" key={patient.id}>
                        <td>
                            {patient.id}
                        </td>
                        <td>
                            {patient.name}
                        </td>
                        <td>
                            {patient.email}
                        </td>
                        <td>
                            <Link className="btn btn-default" to={`/patientedit/${patient.id}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/patientdelete/${patient.id}`}>Delete</Link>
                        </td>
                    </tr>
                );
            }
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Patient list</div>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th>User id</th>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPatients()}
                        <tr className="row" ><td colSpan="4">
                            <Link className="btn btn-primary" to={`/newpatient`}>Add Patient</Link>
                        </td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { patients: state.patients };
}

export default withRouter(connect(mapStateToProps, { fetchPatients })(PatientsIndex));
