
import { BarChart } from "../Charts.tsx";

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

const BarCharts = () => {
  return (
    <div className="admin-container">
       <h1  className="text-lg m-3 font-bold">Bar Charts</h1>
      <main className="chart-container flex jusflex flex-wrap p-5 gap-5 justify-evenly items-center">
        <section className="w-[300px] lg:w-[40%] p-2">
          <BarChart
            data_1={[200, 444, 343, 556, 778, 455, 990]}
            data_2={[300, 144, 433, 655, 237, 755, 190]}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
          <h2 className="text-center">Top Selling Products & Top Customers</h2>
        </section>
        <section className="w-[300px] lg:w-[40%] p-2">
          <BarChart
            horizontal={true}
            data_1={[
              200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
            ]}
            data_2={[]}
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2 className="text-center">Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
