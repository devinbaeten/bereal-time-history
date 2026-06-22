//
//	charts.js
//	BeReal Time History
//
//	Created by Devin Baeten on 2023-06-16.
//

// chartData is a map of regionName => chart data
var chartData = {};

export function createChart(regionName, regionLabel, elementId) {
	chartData[regionName] = [];
	return new Chart($(elementId), {
		type: 'line',
		data: {
			datasets: [{
				data: chartData[regionName],
				borderColor: 'rgba(39, 0, 81, .75)'
			}]
		},
		options: {
			responsive: true,
			scales: {
				y: {
					type: 'linear',
					position: 'left',
					ticks: {
						min: 0,
						max: 86400000,
						stepSize: 3.6e+6,
						beginAtZero: true,
						callback: value => {
							let date = moment.utc(value);
							if (date.diff(moment('1970-02-01 23:59:59'), 'minutes') === 0) {
								return null;
							}

							return date.format('h A');
						}
					}
				},
				x: {
					reverse: true
				}
			},
			plugins: {
				subtitle: {
					display: true,
					text: regionLabel
				},
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: function(context) {
							let ms = context.parsed.y
							return moment.utc(ms).format("h:mm:ss a")
						}
					}
				}
			}
		}
	});
}