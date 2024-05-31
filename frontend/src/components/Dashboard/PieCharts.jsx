// import AdminSidebar from "../../components/AdminSidebar";
import { DoughnutChart, PieChart } from "../Charts.tsx";
import { categories } from "../../Assets/data.js";

const PieCharts = () => {
  return (
    <div className="admin-container h-[80vh] overflow-y-auto">
      {/* <AdminSidebar /> */}
      <h1 className="text-lg m-3 font-bold">Pie & Doughnut Charts</h1>
      <main className=" flex jusflex flex-wrap p-5 gap-5 justify-evenly items-center">
       
        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
          <h2 className="text-center text-lg">Order Fulfillment Ratio</h2>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
        </section>

        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
          <h2 className="text-center text-lg">Product Categories Ratio</h2>
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
        </section>

        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
          <h2 className="text-center text-lg">Stock Availability</h2>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[40, 20]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
        </section>
        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
          <h2 className="text-center text-lg">Revenue Distribution</h2>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
        </section>

        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
        <h2 className="text-center text-lg">Users Age Group</h2>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
         
        </section>

        <section className="w-[300px] lg:w-[40%] p-2 flex justify-center items-center flex-col">
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
