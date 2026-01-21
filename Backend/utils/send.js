import sendmail from "./sendmail.js"

const send = (person, mail, amount, address) => {
  if (person === 'client') {
    sendmail(
      mail,
      'Thanks for your order 🛒',
      `
      Thank you for your order!
      
      Order Details:
      - Total Amount: ₹${amount}
      
      Delivery Address:
      ${address.firstname} ${address.lastname}
      ${address.street}
      ${address.city}, ${address.state} - ${address.zipcode}
      Phone: ${address.phone}
      
      We will deliver your order soon.
      
      Thank you for shopping with us!
      `,
          `
      <h2>Thank you for your order 🛒</h2>
      
      <p><strong>Total Amount:</strong> ₹${amount}</p>
      
      <h3>Delivery Address</h3>
      <p>
      ${address.firstname} ${address.lastname}<br/>
      ${address.street}<br/>
      ${address.city}, ${address.state} - ${address.zipcode}<br/>
      <strong>Phone:</strong> ${address.phone}
      </p>
      
      <p>We will deliver your order soon.</p>
      
      <p><strong>Thank you for shopping with us!</strong></p>
      `
    );
  }
  else {
    sendmail(
      process.env.ADMIN_EMAIL2, // admin email
      "🛒 New Order Received",
      `
      NEW ORDER RECEIVED

      Customer Details:
      Name: ${address.firstname} ${address.lastname}
      Phone: ${address.phone}

      Order Summary:
      Total Amount: ₹${amount}

      Delivery Address:
      ${address.street}
      ${address.city}, ${address.state} - ${address.zipcode}

      Please process this order.
      `,
            `
      <h2>🛒 New Order Received</h2>

      <h3>Customer Details</h3>
      <p>
      <strong>Name:</strong> ${address.firstname} ${address.lastname}<br/>
      <strong>Phone:</strong> ${address.phone}
      </p>

      <h3>Order Summary</h3>
      <p><strong>Total Amount:</strong> ₹${amount}</p>

      <h3>Delivery Address</h3>
      <p>
      ${address.street}<br/>
      ${address.city}, ${address.state} - ${address.zipcode}
      </p>

      <p><strong>Please process this order.</strong></p>
      `
    );

  }
}

export default send;