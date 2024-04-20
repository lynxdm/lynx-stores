import React, { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useGlobalContext } from "../context";
import { MdOutlineCancel } from "react-icons/md";

function Orders() {
  const { orders, cancelOrder, toast } = useGlobalContext();

  useEffect(() => {
    if (orders.length > 0 && window.innerWidth < 1000) {
      toast.info("scroll left for order details");
    }
  }, []);

  if (orders.length < 1) {
    return (
      <ErrorMessage
        title={"no pending orders"}
        link={"products"}
        redirectmsg={"see all products"}
      />
    );
  }

  return (
    <main>
      <section className='orders-section pad-section'>
        <h2 className='heading'>Your Orders</h2>
        <div className='orders-table-container'>
          <table className='orders-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                const {
                  name,
                  id,
                  address,
                  date: { minutes, hours, day, month, year },
                  state: { totalPrice, totalAmount },
                } = item;

                const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                const priceWithTax = parseFloat(
                  (totalPrice + totalPrice * 0.1).toFixed(2)
                );

                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{totalAmount}</td>
                    <td>${priceWithTax}</td>
                    <td>{`${hours.toString().padStart(2, 0)}:${minutes
                      .toString()
                      .padStart(2, 0)} ${hours < 12 ? "AM" : "PM"} - ${
                      months[month]
                    } ${day}, ${year}`}</td>
                    <td>
                      <button
                        className='cancel-order-btn'
                        onClick={() => {
                          cancelOrder(id);
                        }}
                      >
                        <MdOutlineCancel />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Orders;
