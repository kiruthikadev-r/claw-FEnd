import { useState, useContext } from 'react';
import { MdCurrencyRupee } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import { FaMinus } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import NxtMartContext from '../../context/NxtMartContext';
import './index.css';

const ProductItem = ({ product, category }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControl, setShowQuantityControl] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const { addCartItem, updateProduct, removeProduct } = useContext(NxtMartContext);
  const role = Cookies.get('role');
  const categoryName = category;

  const { id, name, weight, price, image } = product;
  const productId = id;
  const actualPrice = parseFloat(price.slice(1)).toFixed(2);

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + change;
      if (newQuantity <= 0) {
        setShowQuantityControl(false);
        return 0;
      }
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    setShowQuantityControl(true);
    addCartItem({ ...product, quantity, category });
  };

  const handleIncrement = () => {
    handleQuantityChange(1);
    addCartItem({ ...product, quantity: quantity + 1, category });
  };

  const handleDecrement = () => {
    handleQuantityChange(-1);
    addCartItem({ ...product, quantity: quantity - 1, category });
  };

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://claw-backend-wmmy.onrender.com/products/category/${encodeURIComponent(categoryName)}/product/${encodeURIComponent(productId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt_token')}` // Assuming you're using a token for auth
        },
        body: JSON.stringify(editedProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      updateProduct(updatedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProduct(product);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`https://claw-backend-wmmy.onrender.com/products/category/${encodeURIComponent(categoryName)}/product/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt_token')}` // Assuming you're using a token for auth
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      removeProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-list-container">
      <li>
        <img src={image} alt={name} className="product-image" />
        <div className="content-container">
          <div>
            <p className="name">{name}</p>
            <p className="description">{weight}</p>
            <p className="price-tag">
              <MdCurrencyRupee /> {actualPrice}
            </p>
          </div>
          <div>
            {showQuantityControl ? (
              <div className="button-container">
                <button
                  onClick={handleDecrement}
                  className="quantity-btn"
                  data-testid="decrement-count"
                >
                  <FaMinus />
                </button>
                <p data-testid="active-count">{quantity}</p>
                <button
                  onClick={handleIncrement}
                  className="quantity-btn"
                  data-testid="increment-count"
                >
                  <GoPlus />
                </button>
              </div>
            ) : (
              <button
                className="add-btn"
                onClick={handleAddToCart}
                data-testid="add-button"
              >
                Add
              </button>
            )}
            {role === 'admin' && (
              <>
                <button
                  className="edit-btn"
                  onClick={handleEditProduct}
                  data-testid="edit-button"
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={handleDeleteProduct}
                  data-testid="delete-button"
                >
                  Delete
                </button>
                {isEditing && (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleEditChange}
                      placeholder="Product Name"
                    />
                    <input
                      type="text"
                      name="weight"
                      value={editedProduct.weight}
                      onChange={handleEditChange}
                      placeholder="Weight"
                    />
                    <input
                      type="text"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                    />
                    <input
                      type="text"
                      name="image"
                      value={editedProduct.image}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default ProductItem;
