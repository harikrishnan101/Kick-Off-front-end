import React, { useEffect, useState } from 'react';
import Courtmodal from '../Components/Modal';
import AxiosInstance from '../Configure/AxiosInstance';
import { BASEURL } from '../Constant/baseUrl';
import Navbarmain from './NavbarMain';

function TimeSlot({ slot }) {
  const [open, setOpen] = useState(false);

  const openModalFn = () => {
    setOpen(true);
  };
  const [formattedDate, setFormattedDate] = useState('');

  const openModalfn = () => {
    if (slot.bookedBY) {
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    // Format the date using JavaScript's built-in Date object
    const dateObject = new Date(slot.date);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setFormattedDate(formattedDate);
  }, [slot]);

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await AxiosInstance.post(BASEURL + "/users/payments", { slotId: slot._id });
    if (result.data.message === "already slot booked") {


      return
    }

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency, receipt } = result.data;

    const options = {
      key: "rzp_test_gVafHjAPUQlbXF", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "BookMyCourt Corp.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          receipt,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await AxiosInstance.post(BASEURL + "/users/paymentsuccess", data);
        setOpen(false)
        alert(result.data.msg);

      },
      prefill: {
        name: "Ben linus",
        email: "Benlinus@gmail.com",
        contact: "9874563210",
      },
      notes: {
        address: "Ben linus Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  }


  function loadScript(src) {
 try {
     return new Promise((resolve) => {
       const script = document.createElement("script");
       script.src = src;
       script.onload = () => {
         resolve(true);
       };
       script.onerror = () => {
         resolve(false);
       };
       document.body.appendChild(script);
     });
 } catch (error) {
  
 }
  }
  return (
    <>
    
    <span
        className={`${slot.bookedBY ? 'bg-danger' : 'bg-success'
          } py-3 px-3 mt-2`}
        onClick={openModalfn}
      >
        {slot.bookedBY ? 'Slot Booked' : slot.slot.name}
      </span>

      <Courtmodal openModal={open} setOpenModal={setOpen}>
        <div className='mt-1 text-center'>
          <h4>
            <div>{slot?.courts.name}</div>
            <div>{slot?.courts.location}</div>
          </h4>
          <div className='mt-4'>
            <label htmlFor='' className='me-5'>
               Date: {formattedDate}
            </label>
            <br />
            <label htmlFor='' className='me-5'>
              Time: {slot?.slot.name}
            </label> 
            <br />
            <label htmlFor='' className='me-5'>
              Amount: {slot?.cost}
            </label>
          </div>
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-primary mt-2" onClick={displayRazorpay}>
            Pay
          </button>
        </div>
      </Courtmodal>
      
    </>
  );
}

export default TimeSlot;
