import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import TreePage from './pages/TreePage';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/tree-select-input' element={<TreePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
