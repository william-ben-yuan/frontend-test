import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Create from './screens/Person/Create';
import Edit from './screens/Person/Edit';
import View from './screens/Person/View';
import CreateContact from './screens/Contacts/Create';
import PrivateRoute from './components/PrivateRoute';
import EditContact from './screens/Contacts/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><Edit /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><View /></PrivateRoute>} />
        <Route path="/create-contact/:id" element={<PrivateRoute><CreateContact /></PrivateRoute>} />
        <Route path="/edit-contact/:id" element={<PrivateRoute><EditContact /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
