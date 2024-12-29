import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Admin from "./components/Admin"
import Payment from "./components/Payment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

function App() {
  

  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Elements stripe={loadStripe("pk_test_51QaGutLODVM2Ouss9lYPOJlOzA7IEDUY0f3krhe4VixD4EVilcJ2ybW07KdaDSsM8ZbFl5jJFPQeGn33Gvk1FOh900pYl6mZjv")}>
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Route>
        </Routes>
        </Elements>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
