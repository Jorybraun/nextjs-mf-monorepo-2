import React, { useState, useEffect } from 'react';
import { useCartState } from 'cart/CartProvider';

const Checkout = ({ onOrderComplete, onNavigateBack }) => {
  const [step, setStep] = useState(1); // 1: Customer Info, 2: Review, 3: Complete
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { totalPrice, items: cartItems } = useCartState()


  useEffect(() => {
    // Checkout page tracking - analytics removed
  }, [step, cartItems.length, totalPrice]);

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.state.trim()) newErrors.state = 'State is required';
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    if (customerInfo.paymentMethod === 'credit') {
      if (!customerInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!customerInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!customerInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = `ORD-${Date.now()}`;      
      setStep(3);
      
      if (onOrderComplete) {
        onOrderComplete(orderId);
      }
    } catch (error) {
      console.error('Order processing error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const taxAmount = totalPrice * 0.08;
  const finalTotal = totalPrice + taxAmount;

  if (step === 3) {
    return (
      <div style={{ 
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: '3rem',
          backgroundColor: '#d4edda',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            color: '#155724',
            marginBottom: '1rem',
            fontSize: '2rem'
          }}>
            🎉 Order Complete!
          </h1>
          <p style={{ 
            color: '#155724',
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}>
            Thank you for your purchase, {customerInfo.firstName}!
          </p>
          <p style={{ color: '#155724' }}>
            Your order has been successfully placed and you will receive a confirmation email shortly.
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Items ({cartItems.length}):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Tax:</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderTop: '1px solid #ddd',
            paddingTop: '0.5rem',
            marginTop: '0.5rem'
          }}>
            <span>Total:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>

        <div style={{ 
          marginTop: '3rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>Module Federation Info:</strong>
          <br />
          • Checkout App (port 3005)
          <br />
          • Exposes: Checkout component
          <br />
          • Analytics: Checkout flow and purchase completion tracked
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#333', 
        marginBottom: '2rem'
      }}>
        Checkout
      </h1>

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
        padding: '0 2rem'
      }}>
        {[1, 2].map(stepNum => (
          <div key={stepNum} style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: step >= stepNum ? '#28a745' : '#dee2e6',
              color: step >= stepNum ? 'white' : '#6c757d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {stepNum}
            </div>
            <span style={{
              marginLeft: '0.5rem',
              color: step >= stepNum ? '#28a745' : '#6c757d',
              fontWeight: step === stepNum ? 'bold' : 'normal'
            }}>
              {stepNum === 1 ? 'Customer Info' : 'Review Order'}
            </span>
            {stepNum < 2 && (
              <div style={{
                flex: 1,
                height: '2px',
                backgroundColor: step > stepNum ? '#28a745' : '#dee2e6',
                margin: '0 1rem'
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Main Content */}
        <div>
          {step === 1 && (
            <div>
              <h2 style={{ marginBottom: '2rem', color: '#333' }}>Customer Information</h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.firstName ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.firstName && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.firstName}</span>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.lastName ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.lastName && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.lastName}</span>}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.email ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.email && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.phone ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.phone}</span>}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Address *
                </label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.address ? '2px solid #dc3545' : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
                {errors.address && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.address}</span>}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.city ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.city && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.city}</span>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.state ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.state && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.state}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.zipCode ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
                    }}
                  />
                  {errors.zipCode && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.zipCode}</span>}
                </div>
              </div>

              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Payment Information</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Payment Method
                </label>
                <select
                  value={customerInfo.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="credit">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="applepay">Apple Pay</option>
                </select>
              </div>

              {customerInfo.paymentMethod === 'credit' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.cardNumber ? '2px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.cardNumber && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.cardNumber}</span>}
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Expiry *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.expiryDate ? '2px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.expiryDate && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.expiryDate}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.cvv ? '2px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.cvv && <span style={{ color: '#dc3545', fontSize: '0.8rem' }}>{errors.cvv}</span>}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ marginBottom: '2rem', color: '#333' }}>Review Your Order</h2>
              
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Shipping Address</h3>
                <p style={{ margin: '0', lineHeight: '1.6' }}>
                  {customerInfo.firstName} {customerInfo.lastName}<br />
                  {customerInfo.address}<br />
                  {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}<br />
                  {customerInfo.phone}<br />
                  {customerInfo.email}
                </p>
              </div>

              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Payment Method</h3>
                <p style={{ margin: '0' }}>
                  {customerInfo.paymentMethod === 'credit' && `Credit Card ending in ${customerInfo.cardNumber.slice(-4)}`}
                  {customerInfo.paymentMethod === 'paypal' && 'PayPal'}
                  {customerInfo.paymentMethod === 'applepay' && 'Apple Pay'}
                </p>
              </div>

              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Order Items</h3>
                {cartItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    <div>
                      <strong>{item.name}</strong>
                      <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                        x {item.quantity}
                      </span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
            )}
            
            {onNavigateBack && step === 1 && (
              <button
                onClick={onNavigateBack}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Back to Cart
              </button>
            )}

            {step === 1 && (
              <button
                onClick={handleNextStep}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Continue to Review
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: loading ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '2rem'
        }}>
          <h3 style={{ 
            margin: '0 0 1.5rem 0',
            color: '#333'
          }}>
            Order Summary
          </h3>

          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #ddd'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Tax:</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #ddd',
              color: '#2c5aa0'
            }}>
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#666',
        textAlign: 'center'
      }}>
        <strong>Module Federation Info:</strong>
        <br />
        • Checkout App (port 3005)
        <br />
        • Exposes: Checkout component
        <br />
        • Analytics: Checkout flow and purchase completion tracked
      </div>
    </div>
  );
};

export default Checkout;