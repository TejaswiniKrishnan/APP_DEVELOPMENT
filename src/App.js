import Login from './file/Login';
import Signup from './file/Signup';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RescueForm from './file/RescueForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Homes from './file/Homes';
import LocationInfo from './file/LocationInfo';
import Products from './file/Products';
import Cart from './file/Cart';
import NGOCards from './file/NGOCards';
import RadioPlayer from './file/RadioPlayer';
import Payment from './file/Payment';
import FeaturesGrid from './file/FeauturesGrid';



function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homes />} />
          <Route path="login" element={<Login />} />
        </Route>
          <Route path="signup" element={<Signup />} />
        <Route path="rescueform" element={<RescueForm />} />
        <Route path="/locinfo/:name" element={<LocationInfo />} />
        <Route path="/products/:formName" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ngo" element={<NGOCards />} />
        <Route path="/radio" element={<RadioPlayer />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/about" element={<FeaturesGrid />} />


      </Routes>

    </div>
  );
}

export default App;