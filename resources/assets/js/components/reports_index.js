import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchReports, deleteReport } from "../actions";

class ReportsIndex extends Component {
    componentWillMount() {
        this.props.fetchReports();
    }
    renderReports() {
        // Renders each report item
        return _.map(this.props.reports.all, report => {
            if (report!==null) {
                return (
                    <tr className="row" key={report.id}>
                        <td>
                            {report.id}
                        </td>
                        <td>
                                {report.title}
                        </td>
                        {this.renderReportActions(this.props.reports,report.id)}
                    </tr>
                );
            }
        });
    }
    renderReportActions (reports,id) {
        if (reports.admin==1) {
            return (
                <td>
                    <Link to={`/report/${id}`} className="btn btn-default">View Details</Link>
                    <Link to={`/reportedit/${id}`} className="btn btn-default">Edit</Link>
                    <Link to='#' onClick={this.onDeleteReport.bind(this, id)} className="btn btn-default">Delete</Link>
                </td>
            )
        }else {
            return (
                <td>
                    <Link to={`/report/${id}`} className="btn btn-default">View Details</Link>
                </td>
            )
        }
        return (<div>asdf</div>)
    }
    renderActions() {
            const reports = this.props.reports;
            if (reports.admin==1) {
                return (
                <tr className="row" >
                    <td colSpan="4">
                        <Link to={`/newreport`} className="btn btn-primary">Add report</Link>
                    </td>
                </tr>
                )
            }
    }
    onDeleteReport(id) {
        this.props.deleteReport(id);
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Report list</div>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th>Report id</th>
                            <th>Report name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderReports()}
                        {this.renderActions()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { reports: state.reports };
}

export default withRouter(connect(mapStateToProps, { fetchReports, deleteReport })(ReportsIndex));
