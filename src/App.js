import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutOne from "../src/Layout/LayoutOne.jsx";
import Customer from "../src/Page/Customer/Customer.jsx";
import Vendor from "../src/Page/Vendor/Vendor.jsx";
import Item from "../src/Page/Item/Item.jsx";
function App() {
  return (
    <BrowserRouter>
      <LayoutOne>
        <Routes>
          <Route path="/" />
          <Route path="/customer" element={<Customer />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/items" element={<Item />} />
        </Routes>
      </LayoutOne>
    </BrowserRouter>
  );
}

export default App;
