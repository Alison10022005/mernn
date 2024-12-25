import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext';
import { ProductsProvider } from './context/ProductsContext';

import Footer from "./components/Foorter";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Categories from './components/Categories'
import CategoriesPage from './pages/CategoriesPage.'
import ProductDetail from './components/ProductDetail'
import PurchaseForm from './components/PurchaseForm'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import AdminRoute from './components/AdminRoute';
import Cart from './components/Cart';
import MapFooter from './components/MapFooter'


function App () {
  return (
    <AuthProvider>
       <ProductsProvider>
      <CarritoProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/ProductList' element={<ProductList/>}/>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path="/Categories" element={<Categories onSelectCategory={() => {}} />} />
              <Route path="/CategoriesPage" element={<CategoriesPage />} />
              <Route path='/product-detail/:id' element={<ProductDetail/>}/>
              <Route path='/PurchaseForm' element={<PurchaseForm/>} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Navbar" element= {<Navbar />}  />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
              <Route path= "/MapFooter" element={<MapFooter />} />


              <Route element={<ProtectedRoute />}>
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>

          <br /><br /><br />
           {/* Footer */}
 <footer>
   <Footer />
   <MapFooter />
 </footer>
        </BrowserRouter>
      </CarritoProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}
export default App