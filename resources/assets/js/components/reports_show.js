import _ from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReport } from '../actions/index'
import { Link } from 'react-router-dom'

class ReportsShow extends Component {
  componentWillMount () {
    this.props.fetchReport(this.props.match.params.id)
  }
  renderReport () {
    const {report} = this.props
    return (
      <tr key="{report.id}" className="row">
        <td>
          {report.id}
        </td>
        <td>
          {report.title}
        </td>
      </tr>
    )
  }
  renderTests () {
    const {report} = this.props
    return _.map(report.tests, test => {
      if (test !== null) {
        return (
          <tr className="row" key={`test_${test.id}`}>
            <td>
              {test.id}
            </td>
            <td>
              {test.name}
            </td>
            <td>
              {test.result}
            </td>
          </tr>
        )
      }
    })
  }
  render () {
    const { report } = this.props

    if (!report) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <table className="table table-responsive">
          <thead className="thead-inverse">
            <tr className="row">
              <th>Report Id</th>
              <th>Report Title</th>
            </tr>
          </thead>
          <tbody>
            {this.renderReport()}
          </tbody>
        </table>
        <table className="table table-responsive">
          <thead className="thead-inverse">
            <tr className="row">
              <th>Test Id</th>
              <th>Test Name</th>
              <th>Test Result</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTests()}
          </tbody>
        </table>
        <a target="_blank" className="btn btn-primary" href={`/pdfexport/${report.id}`}>Export to PDF</a>
        <a target="_blank" className="btn btn-primary" href={`/sendemail/${report.id}`}>Send PDF to Mail</a>
      </div>

    )
  }
}

function mapStateToProps (state) {
  return { report: state.reports.report }
}

export default withRouter(connect(mapStateToProps, { fetchReport })(ReportsShow))
