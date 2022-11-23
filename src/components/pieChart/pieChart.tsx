import React, { memo, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ListItem from "../../types/listItem";

function PieChart({ list }: { list: ListItem[] }) {
  const [cityCount, setCityCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const countCity = () => {
      let obj: { [key: string]: number } = {};
      list.forEach((element: ListItem) => {
        if (element.address?.city) {
          if (obj[element.address.city] >= 0) {
            ++obj[element.address.city];
          } else {
            obj[element.address.city] = 1;
          }
        }
      });

      setCityCount(obj);
    };
    countCity();
  }, [list]);
  let options: ApexCharts.ApexOptions | undefined = {
    series: [...Object.values(cityCount)],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [...Object.keys(cityCount)],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div>
      <Chart options={options} series={options.series} type="pie" width="500" />
    </div>
  );
}

export default memo(PieChart);
