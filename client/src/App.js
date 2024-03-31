import { Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header/header';
import Home from './pages/home/home';
import AddBlog from './pages/add-blog/addBlog';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/new-blog' element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
