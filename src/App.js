//App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePatient from './CreatePatient';
import Patient from './Patient';
import UpdatePatient from './UpdatePatient';
import ViewPatient from './ViewPatient';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Patient />} />
                    <Route path='/create' element={<CreatePatient />} />
                    <Route path='/update/:id' element={<UpdatePatient />} />
                    <Route path='/view/:id' element={<ViewPatient />} /> 
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
