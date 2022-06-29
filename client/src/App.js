import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home.jsx'
import Main from './components/Main/Main.jsx'
import Form from './components/Form/Form.jsx'
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx'
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main/create' element={<Form />} />
        <Route path='/main/:id' element={<RecipeDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
