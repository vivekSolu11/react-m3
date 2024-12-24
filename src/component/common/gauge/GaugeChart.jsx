import React from 'react';
import Chart from 'react-apexcharts';

const GaugeChart = ({ value, height = 150, width = 300 }) => {
	const chartOptions = {
		series: [value],
		chart: {
			type: 'radialBar',
			offsetY: 0, // Center the chart vertically
		},
		plotOptions: {
			radialBar: {
				startAngle: -90, // Start from the bottom right
				endAngle: 90, // End at the bottom left
				hollow: {
					size: '70%', // Inner circle size
				},
				dataLabels: {
					name: {
						show: true, // Hide the default name label
					},
					value: {
						offsetY: -30, // Adjust text position for the value
						fontSize: '32px', // Font size for the value
						fontWeight: 600, // Bold font
						color: '#333', // Dark color
						show: true,
					},
					total: {
						show: true,
						offsetY: 30,
						label: 'High Success',
						fontSize: '12px',
						fontWeight: 500,
						color: '#53DD7A',
						formatter: () => `${value}%`, // Custom label formatter
					},
				},
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				type: 'horizontal',
				gradientToColors: ['#53DD7A'], // Green at the end
				stops: [0, 50, 100],
				colorStops: [
					{ offset: 0, color: '#F36767', opacity: 1 }, // Orange
					{ offset: 50, color: '#F0DB1B', opacity: 1 }, // Yellow
					{ offset: 100, color: '#53DD7A', opacity: 1 }, // Green
				],
			},
		},
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<Chart
				options={chartOptions}
				series={chartOptions.series}
				type="radialBar"
				height={height}
				width={width}
			/>
		</div>
	);
};

export default GaugeChart;
