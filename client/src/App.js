import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/App.css';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Home from './Home';
import Status from './Status';
import Error from './Error';
import EventsList from './EventsList';
import Login from './components/Login';
import Services from './components/services/Services';
import FinancialAdvices from './components/services/FinancialAdvices';
import FinancialManagement from './components/services/FinancialManagement';
import AccountingBookkiping from './components/services/AccountingBookkiping';
import AuditingTaxation from './components/services/AuditingTaxation';
import BusinessValuation from './components/services/BusinessValuation';
import RiskManagement from './components/services/RiskManagement';
import ClientDash from './User/Client/ClientDash';
import EditProfile from './User/Client/EditProfile';
import AppointmentHistory from './User/Client/AppointmentHistory';
import BookAppointment from './User/Client/BookAppointment';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/status" component={Status} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/listAll" component={EventsList} />
        <Route path="/services" component={Services} />
        <Route path="/clientdash" component={ClientDash} />
        <Route path="/services" component={Services} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/appointments" component={AppointmentHistory} />
        <Route path="/book-appointment" component={BookAppointment} />
        <Route path="/financial-advices" component={FinancialAdvices} />
        <Route path="/financial-management" component={FinancialManagement} />
        <Route path="/accounting-bookkiping" component={AccountingBookkiping} />
        <Route path="/auditing-taxation" component={AuditingTaxation} />
        <Route path="/business-valuation" component={BusinessValuation} />
        <Route path="/risk-management" component={RiskManagement} /> {/* Updated path */}
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
