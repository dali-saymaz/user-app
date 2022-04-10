import { useState, useRef, useEffect } from "react";
import { Button, Input, Divider, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import style from "./home.module.css"
import ProductCard from "../../components/ProductCard";
import { useAuth } from '../../contexts/AuthContext';

function App() {
  const productSearch = useRef()
  const [products, setProducts] = useState();
  const [productInput, setProductInput] = useState("");
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const { name, user, setUser } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    productSearch.current?.focus();

  }, [])

  const fetchProducts = async (inp) => {
    const res = await fetch(`./fr.json`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }, 
       credentials: 'include'

    })
    // const res = await fetch(`http://localhost:5000/product?name=${inp}`
    //   ,
    //   {
    //     credentials: 'include'
    //   }
    // );
    const response = await res.json();
    console.log(response)
    setProducts(response);
  };

  const handleInputChange = (event) => {
    console.log(event.target.id);
    if (event.target.id === "productSearch") {
      setProductInput(event.target.value);
      if (event.target.value) fetchProducts(event.target.value);
      else setProducts();
    }

  };

  const addProduct = () => {
    navigate("/product/add");
  }

  const handleOk = () => {
    setIsProductModalVisible(false);
  };

  const handleCancel = () => {
    setIsProductModalVisible(false);
  };

  return (
    <div className="App">
      {user ? 
      <div>
        <div className={style.topControl}>
        <h2>User App</h2>
        <Input
          ref={productSearch}
          className={style.topinput}
          type="text"
          onChange={handleInputChange}
          value={productInput}
          placeholder="Search Product"
          id="productSearch"
        />
        <Button
          className={style.topButton}
          type="primary"
          onClick={addProduct}
        >Add New Product</Button>
        <Modal title="Basic Modal" visible={isProductModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div>
        {products && <Divider>Result</Divider>}
      </div>
      <div className={style.productsWrapper}>
        {
          products?.map(product =>
            <ProductCard key={product._id} product={product} />
          ) 
        }
      </div> </div> : <h1>Please Login</h1>}




    </div>
  );
}

export default App;
