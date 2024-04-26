import { InterfaceCPUInfo, InterfaceDiskInfo, InterfaceMemoryInfo, InterfaceQueriesInfo, InterfaceRequestsInfo } from "@/hooks/socketMonitor";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import React, { useRef } from "react";
import Colors from "@/utils/colors";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

const colorsObject = new Colors();
const colors = colorsObject.getTheme();

function CPUMonitor(props: InterfaceCPUInfo) {
	const percent = props.percent;
	const max = 100 - percent;
	const data = {
		labels: ["Used", "Free"],
		datasets: [
			{
				data: [percent, max],
				backgroundColor: [colors.primary, colors.whiteGlass],
				hoverBackgroundColor: [colors.darkGlass, colors.darkGlass],
				borderWidth: 0,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: true,
			},
		},
	};
	return <Doughnut data={data} options={options} />;
}

function DiskMonitor(props: InterfaceDiskInfo) {
	const usedPercentage = (props.used / props.total) * 100;
	const freePercentage = (props.free / props.total) * 100;
	const data = {
		labels: ["Used", "Free"],
		datasets: [
			{
				data: [usedPercentage, freePercentage],
				backgroundColor: [colors.primary, colors.whiteGlass],
				hoverBackgroundColor: [colors.darkGlass, colors.darkGlass],
				borderWidth: 0,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: true,
			},
		},
	};
	return <Doughnut data={data} options={options} />;
}

function MemoryMonitor(props: InterfaceMemoryInfo) {
	const usedPercentage = (props.used / props.total) * 100;
	const freePercentage = (props.free / props.total) * 100 + (props.available / props.total) * 100;

	const data = {
		labels: ["Used", "Free"],
		datasets: [
			{
				data: [usedPercentage, freePercentage],
				backgroundColor: [colors.primary, colors.whiteGlass],
				hoverBackgroundColor: [colors.darkGlass, colors.darkGlass],
				borderWidth: 0,
			},
		],
	};
	const options = {
		plugins: {
			legend: {
				display: true,
			},
		},
	};
	return <Doughnut data={data} options={options} />;
}

function CombinedMonitor(props: { queries: InterfaceQueriesInfo[]; requests: InterfaceRequestsInfo[] }) {
	const chartRef = useRef(null);

	const mysqlValues = props.queries.map((item) => {
		return {
			hour: item.hour,
			count: item.count,
		};
	});

	const requestValues = props.requests.map((item) => {
		return {
			hour: item.hour,
			count: item.count,
		};
	});

	const data = {
		labels: mysqlValues.map((item) => item.hour),
		datasets: [
			{
				label: "MySQL Queries",
				data: mysqlValues.map((item) => item.count),
				fill: false,
				borderColor: colors.primary,
				tension: 0.1,
				borderRadius: 10,
			},
			{
				label: "HTTP Requests",
				data: requestValues.map((item) => item.count),
				fill: false,
				borderColor: colors.info,
				tension: 0.1,
				borderRadius: 10,
			},
		],
	};

	const options = {
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: "12 hours statistics",
				},
			},
			y: {
				display: true,
				title: {
					display: true,
					text: "Count",
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: "top" as "top",
				font: {
					size: 16,
					family: "monospace",
				},
				padding: 20,
				borderRadius: 10,
			},
		},
	};

	return <Line ref={chartRef} data={data} options={options} />;
}

export { CPUMonitor, DiskMonitor, MemoryMonitor, CombinedMonitor };
