import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Products.css";
import blanket from "./Components/blanket.jpg";
import food from "./Components/cannedfoods.jpg";
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

const imageMap = {
  blanket,
  food,
  medicine,
  torch,
  umbrella,
  clothes,
  boots,
  water,
  batteries,
  candle,
  pillow,
  firstaid,
};

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state || { selectedItems: [] };
  const handleProceedToNGOCards = () => {
    console.log(
      "Selected Items: " +
        selectedItems.map((item) => `${item.name} (${item.count})`).join(", ")
    );
    navigate("/ngo", { state: { selectedItems } });
  };

  return (
    <div className="carts">
      <Navbar />
      <br />
      <br />
      <br />
      <center><h2>Selected Items</h2></center>
      <ul className="cards">
        {selectedItems.map(({ name, count }) => (
          <li key={name.toLowerCase()} className="card-item">
            {" "}
            {/* Ensure unique key */}
            <a href="#" className="card">
              <img
                src={imageMap[name.toLowerCase()]} // Convert name to lowercase
                className="card__image"
                alt={name}
              />
              <div className="card__overlay">
                <div className="card__header">
                  <h3 className="card__title">{name}</h3>
                  <p className="card__quantity">Quantity: {count}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <center>
          <button className="checkout-button" onClick={handleProceedToNGOCards}>
            Donate
          </button>
      </center>
    </div>
  );
};

export default Cart;
