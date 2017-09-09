import _ from 'lodash'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReports } from '../actions'

class ReportsIndex extends Component {
  componentWillMount () {
    this.props.fetchReports()
  }
  renderReports () {
    // Renders each report item
    return _.map(this.props.reports.all, report => {
      if (report !== null) {
        return (
          <tr className="row" key={report.id}>
            <td>
              {report.id}
            </td>
            <td>
              {report.title}
            </td>
            <td>
              <Link to={`/report/${report.id}`} className="btn btn-default">View Details</Link>
              <Link to={`/reportedit/${report.id}`} className="btn btn-default">Edit</Link>
              <Link to={`/reportdelete/${report.id}`} className="btn btn-default">Delete</Link>
            </td>
          </tr>
        )
      }
    })
  }

  render () {
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
            <tr className="row" >
              <td colSpan="4">
                <Link to={`/newreport`} className="btn btn-primary">Add report</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { reports: state.reports }
}

export default withRouter(connect(mapStateToProps, { fetchReports })(ReportsIndex))
