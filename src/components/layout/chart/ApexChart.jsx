import Chart from "react-apexcharts";

export const ChartModel = ({ categories, series, type }) => {
	const options = {
		chart: {
			id: "basic-bar",
		},
		yaxis: {
			show: false,
		},
		xaxis: {
			categories: categories,
		},
	};

	return <Chart options={options} series={series} type={type} />;
};

export const DonutChart = ({ labels, series }) => {
	const options = {
		labels,
		plotOptions: {
			pie: {
				donut:{
					size: '50%',
					labels: {
						show: true
					},
				}
			}
		}
	};

	return <Chart options={options} series={series} type={"donut"} />;
};
