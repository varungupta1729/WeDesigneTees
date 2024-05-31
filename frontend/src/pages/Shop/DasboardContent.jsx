import React from "react";
import CreateProducts from "../../components/Dashboard/CreateProducts.jsx";
import AllProducts from "../../components/Dashboard/AllProducts.jsx";
import ShopCreateEvent from "../../components/Dashboard/ShopCreateEvent.jsx";
import ShopAllEvents from "../../components/Dashboard/ShopAllEvents.jsx";
import AllCoupons from "../../components/Dashboard/AllCoupons.jsx";
import DashboardHero from "../../components/Dashboard/DashboardHero.jsx";
import AllOrders from "../../components/Dashboard/AllOrders.jsx";
import WithdrawMoney from "../../components/Dashboard/WithdrawMoney.jsx";
import AllRefundOrders from "../../components/Dashboard/AllRefundOrders.jsx";
import BarCharts from "../../components/Dashboard/BarCharts.jsx";
import PieCharts from "../../components/Dashboard/PieCharts.jsx";
import LineCharts from "../../components/Dashboard/LineCharts.jsx";
import { useNavigate } from "react-router-dom";
import ShopSettings from "../../components/Dashboard/ShopSettings.jsx";


const DasboardContent = ({ active, setActive }) => {
  const navigate = useNavigate();
  if(active === 8){
  
    navigate('/dashboard-messages')
  }
  
  return (
    <div className={active === 4 ? "w-full lg:w-[50%]": "" }>
      {active === 1 && <DashboardHero/>}
      {active === 2 && <AllOrders/>}
      {active === 3 && <AllProducts />}
      {active === 4 && <CreateProducts />}
      {active === 5 &&  <ShopAllEvents/>}
      {active === 6 && <ShopCreateEvent/>}
      {active === 7 && <WithdrawMoney/>}
      {active === 8 && <div>Dashboard</div>}
      {active === 9 && <AllCoupons/>}
      {active === 10 && <AllRefundOrders/>}
      {active === 11 && <ShopSettings/>}
      {active === 12 && <BarCharts/>}
      {active === 13 && <PieCharts/>}
      {active === 14 && <LineCharts/>}
    </div>
  );
};

export default DasboardContent;
