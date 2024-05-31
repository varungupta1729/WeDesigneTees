// import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../Charts.tsx";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const LineCharts = () => {
  return (
    <div className="admin-container h-[80vh] overflow-y-auto">
      {/* <AdminSidebar /> */}
      <h1  className="text-lg m-3 font-bold">Line Charts</h1>
      <main className=" flex flex-wrap p-5 gap-5 justify-evenly items-center">
        
        <section className="w-[300px] lg:w-[40%] p-2">
        <h2 className="text-center">Active Users</h2>
          <LineChart
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={months}
          />
          
        </section>
        <section className="w-[300px] lg:w-[40%] p-2">
        <h2 className="text-center">Total Products (SKU)</h2>
          <LineChart
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={months}
          />
         
        </section>

        <section className="w-[300px] lg:w-[40%] p-2">
        <h2 className="text-center">Total Revenue</h2>
          <LineChart
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
        
        </section>

        <section className="w-[300px] lg:w-[40%] p-2">
        <h2 className="text-center">Discount Allotted</h2>
          <LineChart
            data={[
              9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 5000,
            ]}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
