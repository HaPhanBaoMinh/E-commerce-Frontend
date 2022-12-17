import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/layouts/defaultLayout/index";
import { Fragment, useEffect, useRef, useState } from "react";
import { RouterComponent } from "./routes/index"
import { useDispatch, useSelector } from 'react-redux';
import fetchProductsData from './action/productsReducerAction';
import axios from 'axios';
import { ROUTE } from './api/route';
import fetchCategoryData from './action/categoryReducerAction';
import { fetchUserData } from './action/userinfoReducerAction';
import { fetchCartData } from './action/cartReducerAction';
import { fetchStoreData } from './action/storeReducerAction';
import { io } from "socket.io-client";

function App() {
  const dispath = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const socket = useRef();
  socket.current = io(ROUTE);

  useEffect(() => {
    if (socket.current) {
      // console.log('new-vitsitor');
      socket.current.emit("new-vitsitor")
    }
  }, [socket.current])

  useEffect(() => {
    // fetch products data
    const getProductData = async () => {
      const { data } = await axios.get(`${ROUTE}/api/product`);
      if (data.status) {
        dispath(fetchProductsData(data.result));
      }
    }

    //fetch category data
    const getCategoryData = async () => {
      const { data } = await axios.get(`${ROUTE}/api/category`)
      if (data.status) {
        dispath(fetchCategoryData(data.result));
        // setIsLoading(false);
      }
    }

    const autoLogin = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (email && password) {
          const { data } = await axios.post(`${ROUTE}/api/customer/login`, {
            email, password
          });
          if (data.status === true) {
            dispath(fetchUserData(data.result));
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getBannerData = async () => {
      const { data } = await axios.get(`${ROUTE}/api/store`);
      if (data.status) {
        dispath(fetchStoreData(data.result));
      }
    }
    getProductData();
    getCategoryData();
    autoLogin();
    getBannerData();
  }, [])

  useEffect(() => {
    const getCartOfUser = async () => {
      const { data } = await axios.post(`${ROUTE}/api/cart/customer`, {
        customer_id: userInfo.id
      });
      dispath(fetchCartData(data.result))
    }

    if (userInfo) {
      getCartOfUser()
    }
  }, [userInfo])

  return (
    <Router>
      <div className="App">
        <Routes>
          {
            RouterComponent.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout === null) {
                Layout = Fragment
              } else if (route.layout) {
                Layout = route.layout
              }
              return <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>} />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
