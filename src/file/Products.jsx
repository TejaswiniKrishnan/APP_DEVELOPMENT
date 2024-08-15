import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import "./Home.css";
import blanket from "./Components/blanket.jpg";
import cannedfoods from "./Components/cannedfoods.jpg";
import medicine from "./Components/medicine.jpg";
import torch from "./Components/torch.jpg";
import umbrella from "./Components/umbrella.avif";
import clothes from "./Components/clothes.jpg";
import boots from "./Components/boots.avif";
import water from "./Components/water.jpg";
import batteries from "./Components/batteries.jpg";
import candle from "./Components/candle.jpg";
import pillow from "./Components/pillow.jpg";
import firstaid from "./Components/firstaid.jpg";
import Navbar from "./Navbar";


const Products = () => {
  const [quantities, setQuantities] = useState({});
  const [locationGoods, setLocationGoods] = useState([]);
  const navigate = useNavigate();
  const { formName } = useParams();
  console.log(formName);

  useEffect(() => {
    if (formName) {
      const fetchLocationGoods = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/forms/${formName}/goods`);
          console.log("API Response:", response.data); // Log API response
          const goods = response.data.reduce((acc, good) => {
            acc[good.name.toLowerCase()] = 0;
            return acc;
          }, {});
          setQuantities(goods);
          setLocationGoods(response.data);
        } catch (error) {
          console.error("Error fetching location goods", error);
        }
      };
  
      fetchLocationGoods();
    }
  }, [formName]);

  const handleQuantityChange = (item, value) => {
    const requiredQuantity = locationGoods.find(
      (good) => good.name.toLowerCase() === item
    )?.count || 0;
    
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: Math.min(requiredQuantity, Math.max(0, prevQuantities[item] + value)),
    }));
  };

  const handleProceed = async () => {
    const selectedItems = Object.keys(quantities)
      .filter((key) => quantities[key] > 0)
      .map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        count: quantities[key],
      }));
    console.log("Selected Items:", selectedItems); // Log selected items
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/forms/${formName}/donate`,
        selectedItems
      );
      const updatedGoods = response.data;
      console.log("Updated Goods:", updatedGoods); // Log updated goods
  
      setLocationGoods(updatedGoods);
      setQuantities(
        updatedGoods.reduce((acc, good) => {
          acc[good.name.toLowerCase()] = 0;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error updating goods", error);
    }
  
    navigate("/cart", { state: { selectedItems } });
  };

  const products = [
    { id: "blanket", name: "Blanket", img: blanket },
    { id: "food", name: "Food", img: cannedfoods },
    { id: "medicine", name: "Medicine", img: medicine },
    { id: "torch", name: "Torch", img: torch },
    { id: "umbrella", name: "Umbrella", img: umbrella },
    { id: "clothes", name: "Clothes", img: clothes },
    { id: "boots", name: "Boots", img: boots },
    { id: "water", name: "Water", img: water },
    { id: "batteries", name: "Batteries", img: batteries },
    { id: "candle", name: "Candle", img: candle },
    { id: "pillow", name: "Pillow", img: pillow },
    { id: "firstaid", name: "First Aid", img: firstaid },
  ];

  const filteredProducts = products.filter((product) =>
    locationGoods.some((good) => good.name.toLowerCase() === product.id)
  );

  if (!formName) {
    return <div>Error: Form name is not specified.</div>;
  }

  return (
    <div className="pro">
      <Navbar />
      <br />
      <br />
      <ul className="cards">
        {filteredProducts.map(({ id, name, img }) => (
          <li key={id}>
            <a href="#" className="card" onClick={(e) => e.preventDefault()}>
              <img src={img} className="card__image" alt={name} />
              <div className="card__overlay">
                <div className="card__header">
                  <h3 className="card__title">{name}</h3>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(id, -1)}>
                      -
                    </button>
                    <input type="text" value={quantities[id]} readOnly />
                    <button onClick={() => handleQuantityChange(id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <h3 className="card__required">
                  Required:{" "}
                  {locationGoods.find((good) => good.name.toLowerCase() === id)
                    ?.count || 0}
                </h3>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <button className="proceed-button" onClick={handleProceed}>
        Proceed
      </button>
    </div>
  );
};

export default Products;