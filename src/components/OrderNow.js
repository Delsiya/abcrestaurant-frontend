import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the CSS file

// Import images
import biryaniImage from '../images/biryani.jpg';
import friedriceImage from '../images/friedrice.jpg';

function OrderNow() {
  const menu = [
    { id: 1, name: 'Biryani', price: 15, image: biryaniImage },
    { id: 2, name: 'Fried Rice', price: 10, image: friedriceImage },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleAddToOrder = (item) => {
    const updatedQuantity = quantities[item.id] || 1;
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(selectedItem => selectedItem.id === item.id);

      if (existingItem) {
        return prevItems.map(selectedItem =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + updatedQuantity }
            : selectedItem
        );
      } else {
        return [...prevItems, { ...item, quantity: updatedQuantity }];
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item before proceeding to checkout.');
      return;
    }

    console.log('Selected items before checkout:', selectedItems);

    navigate('/order-checkout', { state: { orderItems: selectedItems } });
  };

  return (
    <section id="ordernow">
      <div className="container">
        <h2>Select Your Items</h2>
        <div className="menu">
          {menu.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                min="1"
                value={quantities[item.id] || 1}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
              />
              <button onClick={() => handleAddToOrder(item)}>Add to Order</button>
            </div>
          ))}
        </div>
        <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      </div>
    </section>
  );
}

export default OrderNow;
