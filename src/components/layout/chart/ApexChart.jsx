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
		colors: ['#A5DD9B', '#EE4266']
	};



	return <Chart options={options} series={series} type={type} />;
};
