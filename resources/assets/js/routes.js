import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReportsIndex from './components/reports_index';
import ReportsShow from './components/reports_show';
import ReportsNew from './components/reports_new';
import ReportsEdit from './components/reports_edit';
import PatientsIndex from './components/patients_index';
import PatientsNew from './components/patients_new';
import PatientsEdit from './components/patients_edit';



const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={ReportsIndex}/>
            <Route exact path="/reports" component={ReportsIndex}/>
            <Route path="/newreport" component={ReportsNew}/>
            <Route path="/report/:id" component={ReportsShow}/>
            <Route path="/reportedit/:id" component={ReportsEdit}/>
            <Route exact path="/patients" component={PatientsIndex}/>
            <Route path="/newpatient" component={PatientsNew}/>
            <Route path="/patientedit/:id" component={PatientsEdit}/>
        </div>
    </Router>
);

export default Routes;