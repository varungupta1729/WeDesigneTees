


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { backend_url } from "../../server";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  const shortMonths = [
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
    "Dec"
  ];
function formatted_date(str)
{
   var result="";
   var d = new Date(str);
   result +=  d.getDate()+" "+ shortMonths[d.getMonth()]+" "+d.getFullYear() + 
             ", "+ d.getHours()+":"+d.getMinutes()
             
   return result;
}

 
 console.log(data)
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
        Track the delivery 
      </h2>
      <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
        
      {
        data?.cart.map((item , index)=>{
          console.log(item)
          return(
            <div className="space-y-4 p-6">
            <div className="flex items-center gap-6">
              <a href="#" className="h-20 w-14 shrink-0">
                <img
                  className="h-full w-full "
                  src={item?.images[0].url}
                  alt="imac image"
                />
                </a>
              <a
                href="#"
                className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
              >
               {item?.name}
              </a>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  Product ID:
                </span>{" "}
                BJ8364850
              </p>
              <div className="flex items-center justify-end gap-4">
                <p className="text-base font-normal text-gray-900 dark:text-white">
                  x{item?.qty}
                </p>
                <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  Rs.{item?.discountPrice}
                </p>
              </div>
            </div>
          </div>
          )
        })
      }
          <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
            <div className="space-y-2">
            
              
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-lg font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd className="text-lg font-bold text-gray-900 dark:text-white">
                Rs.{data?.totalPrice}
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order history
            </h3>
            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
              
              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing"  && data?.status !== "On the way" &&  data?.status !== "Received"  && data?.status !== "Transferred to delivery partner" && data?.status !== "Shipping" &&  ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" && data?.status !== "On the way" && data?.status !== "Received"  && data?.status !== "Transferred to delivery partner"  && data?.status !== "Shipping"? (<>
                <h4 className="mb-0.5 font-semibold">Delivered</h4>
                <p className="text-sm">Your order is delivered!</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Delivery</h4>
                <p className="text-sm">Not Delivered</p> </>)
                }
                </div>
              </li>
             
              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing"  && data?.status !== "Received"  &&  data?.status !== "Transferred to delivery partner" && data?.status !== "Shipping" &&  ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" && data?.status !== "Transferred to delivery partner" && data?.status !== "Received"   &&  data?.status !== "Shipping"? (<>
                <h4 className="mb-0.5 font-semibold">Received in City</h4>
                <p className="text-sm">Our Delivery man is going to deliver your order.</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Not Received</h4>
                <p className="text-sm">Not on the Way</p> </>)
                }
                </div>
              </li>
              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing" && data?.status !== "Transferred to delivery partner" && data?.status !== "Shipping"  && ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" && data?.status !== "Transferred to delivery partner" && data?.status !== "Shipping"  ? (<>
                <h4 className="mb-0.5 font-semibold">Received</h4>
                <p className="text-sm"> Your Order is in your city. Our Delivery man will deliver it.</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Not Received</h4>
                <p className="text-sm">Order not came to your city</p> </>)
                }
                </div>
              </li>
             
              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing" && data?.status !== "Transferred to delivery partner"  && ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" && data?.status !== "Transferred to delivery partner" ? (<>
                <h4 className="mb-0.5 font-semibold">Shipped</h4>
                <p className="text-sm"> Your Order is on the way with our delivery partner</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Shipping</h4>
                <p className="text-sm">Not Shipped</p> </>)
                }
                </div>
              </li>


              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing"  && ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" ? (<>
                <h4 className="mb-0.5 font-semibold">Transfered</h4>
                <p className="text-sm">Your Order is on the way for delivery partner.</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Transfer to delivery partner</h4>
                <p className="text-sm">Not Transferred</p> </>)
                }
                </div>
              </li>

              <li className="ms-6 mb-10 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
             { data && data?.status !== "Processing" &&  ( <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>)}
                </span>
                <div>
                {
                  data && data?.status !== "Processing" ? (<>
                <h4 className="mb-0.5 font-semibold">{formatted_date(data?.createdAt)}</h4>
                <p className="text-sm">Processed</p> </>) : (<>
                <h4 className="mb-0.5 font-semibold">Processing</h4>
                <p className="text-sm">Your Order is processing in shop</p> </>)
                }
                </div>
              </li>

              
              <li className="ms-6 text-primary-700 dark:text-primary-500">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                  <svg
                    className="h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </span>
                <div>
                  <h4 className="mb-0.5 font-semibold">{formatted_date(data?.createdAt)}</h4>
                  <a href="#" className="text-sm font-medium hover:underline">
                    Order placed
                  </a>
                </div>
              </li>
            </ol>
           
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default TrackOrder;
