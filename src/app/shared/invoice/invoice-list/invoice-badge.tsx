import React, { useState } from 'react';
import { Badge, } from 'rizzui';

const InvoiceBadge = () => {
  const [status, setStatus] = useState('Unpaid');
  const [color, setColor] = useState<'danger' | 'success'>('danger');

  const handlePayment = async () => {
    try {
      // Simulate payment processing
      const paymentSuccessful = true; // replace with actual payment logic
      if (paymentSuccessful) {
        setStatus('Paid');
        setColor('success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div>
      <Badge
        variant="flat"
        color={color}
        rounded="md"
        className="mb-3 md:mb-2"
      >
        {status}
      </Badge>
      {/* <Button onClick={handlePayment}>Pay</Button> */}
    </div>
  );
};

export default InvoiceBadge;
