//
//	loader.js
//	BeReal Time History
//
//	Created by Devin Baeten on 2022-09-30.
//

import $ from 'jquery';
import moment from 'moment-timezone';
import Chart from 'chart.js/auto';
import { version } from '../../package.json';

$(document).ready(function() {
	// Fetch the list of timezones from the API
	$('#timezoneSelect').append($('<option>', {
		value: moment.tz.guess(),
		text: `Local (${moment.tz.guess()})`
	}));
	$.ajax({
		url: 'https://apis.devinbaeten.com/timezones',
		type: 'GET',
		crossDomain: true,
		dataType: 'json',
		success: function(data) {
			$.each(data, function(key, timezone) {
				$('#timezoneSelect').append($('<option>', {
					value: timezone,
					text: timezone
				}));
			});
		},
		error: function() {
			console.log('Failed to retrieve time zones.');
		}
	});

	// When the selected timezone changes, update the download link
	$('#timezoneSelect').on('change', function() {
		const tz = this.value;
		$('#downloadButton').attr('href', `https://apis.devinbaeten.com/prod/app/bereal/api/moments/history/csv?tz=${tz}`);
	});
	
	checkAlerts();
});

// Display version
$("#version").html("v" + version + " &middot; <a class=\"text-muted\" target=\"blank\" href=\"https://github.com/devinbaeten/bereal-time-history/releases/tag/v" + version + "\">View on GitHub</a>");

// Alerts
function checkAlerts() {
  $.ajax({
	url: 'https://apis.devinbaeten.com/prod/app/bereal/api/alerts',
	type: 'GET',
	dataType: 'json',
	crossDomain: true,
	success: function(data) {
	  if (data && data.alerts) {
		data.alerts.forEach(function(alert) {
		  // alert.class -> e.g. 'alert alert-primary'
		  // alert.content -> e.g. 'Your HTML text content, icons, etc.'
		  $('#alerts').append(`
			<div class="${alert.class}">
			  <span>
				${alert.content}
			  </span>
			</div>
		  `);
		});
	  }
	},
	error: function(xhr, status, error) {
	  console.error('Failed to retrieve alerts:', error);
	  // Optional: show a default alert if the request fails
	  // $('#alerts').append('<div class="alert alert-danger">Could not load alerts.</div>');
	}
  });
}

// Turnstile
var cftsr = "NONE";

function setToken(token) {
	cftsr = token;
	
	// Update the "Live" icon to indicate connection
	var liveTag = $("#live-tag");
	liveTag.removeClass("bg-secondary").addClass("bg-danger").text("LIVE");

	setTimeout(function() {
		$("#dashboard").addClass("opacity-25");
		$("#turnstileClearance").removeClass("d-none");
	}, 1800000);
	$("#dashboard").removeClass("opacity-25");
	$("#turnstileClearance").addClass("d-none");
	setTimeout(function() {
		begin();
	}, 0);
}

// Attach the function to the window object
window.setToken = setToken;

// Charts

// US-CENTRAL
var usCentralChartD = [];
var usCentralChart = new Chart($('#uscChart'), {
	type: 'line',
	data: {
		datasets: [{
			data: usCentralChartD,
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
				text: 'us-central (America/Chicago)'
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

// EUROPE-WEST
var europeWestChartD = [];
var europeWestChart = new Chart($('#euwChart'), {
	type: 'line',
	data: {
		datasets: [{
			data: europeWestChartD,
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
				text: 'europe-west (Europe/Paris)'
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

// ASIA-EAST
var asiaEastChartD = [];
var asiaEastChart = new Chart($('#aeChart'), {
	type: 'line',
	data: {
		datasets: [{
			data: asiaEastChartD,
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
				text: 'asia-east (Australia/Sydney)'
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

// ASIA-WEST
var asiaWestChartD = [];
var asiaWestChart = new Chart($('#awChart'), {
	type: 'line',
	data: {
		datasets: [{
			data: asiaWestChartD,
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
				text: 'asia-west (Asia/Karachi)'
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


// Memory
var retries = 0;

function begin() {
	
	setupMoment();
	
	refresh();
	setTimeout(refreshHistory, 500);
	rtp();
	setInterval(rtp, 100);
	setInterval(refresh, 500);
	setInterval(refreshHistory, 15000);
	
}

function setupMoment() {
	
	// Set new thresholds
	moment.relativeTimeThreshold('s', 60);	// seconds in minute
	moment.relativeTimeThreshold('ss', 1);	// Min for secs to display - 1
	moment.relativeTimeThreshold('m', 60);	// minutes in hour
	moment.relativeTimeThreshold('h', 48);	// hours in day (Set to 48 to prevent, ex: 28hr -> 1 day ago)
	moment.relativeTimeThreshold('d', 7);	// days in week (should never be used)
	moment.relativeTimeThreshold('M', 12);	// weeks in year (should never be used)
	
}

function rtp() {
	
	let now = moment.utc();
	
	$("#us_central_live_clock").text(now.tz("America/Chicago").format("h:mm:ss A"));
	$("#europe_west_live_clock").text(now.tz("Europe/Paris").format("h:mm:ss A"));
	$("#asia_east_live_clock").text(now.tz("Australia/Sydney").format("h:mm:ss A"));
	$("#asia_west_live_clock").text(now.tz("Asia/Karachi").format("h:mm:ss A"));
	
}

function refresh() {
	
	// let us_central = $("#us-central td");
	// let europe_west = $("#europe-west").find("td");
	// let asia_east = $("#asia-east").find("td");
	// let asia_west = $("#asia-west").find("td");
	
	$.ajax({
		    dataType: "json",
		    url: "https://apis.devinbaeten.com/prod/app/bereal/data/current_times",
		    crossDomain: true,
		    jsonpCallback: "callback",
		    headers: {
				"brth-client-auth": cftsr
		    },
		    success: callback,
		    error: failed
	});

	
	function callback(result) {

		var regions = result.regions;

		if ($('#user_prefs_live_regional').is(':checked')) {
			$("#us_central_live_latest_ts").text(moment.utc(regions["us-central"].utc).tz("America/Chicago").format("h:mm:ss A"));
		} else {
			$("#us_central_live_latest_ts").text(moment.utc(regions["us-central"].utc).local().format("h:mm:ss A"));
		}
		$("#us_central_live_latest_rel").text(moment.utc(regions["us-central"].utc).tz("America/Chicago").fromNow());
		if (moment.utc(regions["us-central"].utc).tz("America/Chicago").isSame(moment().tz("America/Chicago"), "day")) {
			$("#us_central_live_alert_dy").addClass("d-none");
			$("#us_central_live_alert_dt").removeClass("d-none");
		} else {
			$("#us_central_live_alert_dy").removeClass("d-none");
			$("#us_central_live_alert_dt").addClass("d-none");
		}
		if (moment.utc().tz("America/Chicago").unix() < (moment.utc(regions["us-central"].utc).tz("America/Chicago").unix() + 120)) {
			
			// Special Styling
			
			$("#us_central_live_alert_dy").addClass("d-none");
			$("#us_central_live_alert_dt").addClass("d-none");
			$("#us_central_live_alert_ttbr").removeClass("d-none");
			
			$("#us_central_live_card").addClass("bg-dark");
			$("#us_central_live_card").addClass("text-light");
			
			$("#us_central_live_card .text-secondary").addClass("text-light");
			
			$("#us_central_live_latest_ts").addClass("text-dark");
			$("#us_central_live_latest_ts").addClass("fw-bold");
			
			$("#us_central_live_latest_rel").removeClass("text-light");
			$("#us_central_live_latest_rel").addClass("text-danger");
			$("#us_central_live_latest_rel").addClass("fw-bold");
			
			// Clock
			
			$("#us_central_live_alert_ttbr_clock").text(moment.utc(((moment.utc(regions["us-central"].utc).tz("America/Chicago").unix() + 120) - moment.utc().tz("America/Chicago").unix())*1000).format('mm:ss'));
			
		} else {
			
			$("#us_central_live_alert_ttbr").addClass("d-none");
			
			// Reset CSS
			
			$("#us_central_live_alert_ttbr").addClass("d-none");
			
			$("#us_central_live_card").removeClass("bg-dark");
			$("#us_central_live_card").removeClass("text-light");
			
			$("#us_central_live_card .text-secondary").removeClass("text-light");
			
			$("#us_central_live_latest_ts").removeClass("text-dark");
			$("#us_central_live_latest_ts").removeClass("fw-bold");
			
			$("#us_central_live_latest_rel").removeClass("text-light");
			$("#us_central_live_latest_rel").removeClass("text-danger");
			$("#us_central_live_latest_rel").removeClass("fw-bold");
			
		}
		
		if ($('#user_prefs_live_regional').is(':checked')) {
			$("#europe_west_live_latest_ts").text(moment.utc(regions["europe-west"].utc).tz("Europe/Paris").format("h:mm:ss A"));
		} else {
			$("#europe_west_live_latest_ts").text(moment.utc(regions["europe-west"].utc).local().format("h:mm:ss A"));
		}
		$("#europe_west_live_latest_rel").text(moment.utc(regions["europe-west"].utc).tz("Europe/Paris").fromNow());
		if (moment.utc(regions["europe-west"].utc).tz("Europe/Paris").isSame(moment().tz("Europe/Paris"), "day")) {
			$("#europe_west_live_alert_dy").addClass("d-none");
			$("#europe_west_live_alert_dt").removeClass("d-none");
		} else {
			$("#europe_west_live_alert_dy").removeClass("d-none");
			$("#europe_west_live_alert_dt").addClass("d-none");
		}
		if (moment.utc().tz("Europe/Paris").unix() < (moment.utc(regions["europe-west"].utc).tz("Europe/Paris").unix() + 120)) {
			
			// Special Styling
			
			$("#europe_west_live_alert_dy").addClass("d-none");
			$("#europe_west_live_alert_dt").addClass("d-none");
			$("#europe_west_live_alert_ttbr").removeClass("d-none");
			
			$("#europe_west_live_card").addClass("bg-dark");
			$("#europe_west_live_card").addClass("text-light");
			
			$("#europe_west_live_card .text-secondary").addClass("text-light");
			
			$("#europe_west_live_latest_ts").addClass("text-dark");
			$("#europe_west_live_latest_ts").addClass("fw-bold");
			
			$("#europe_west_live_latest_rel").removeClass("text-light");
			$("#europe_west_live_latest_rel").addClass("text-danger");
			$("#europe_west_live_latest_rel").addClass("fw-bold");
			
			// Clock
			
			$("#europe_west_live_alert_ttbr_clock").text(moment.utc(((moment.utc(regions["europe-west"].utc).tz("Europe/Paris").unix() + 120) - moment.utc().tz("Europe/Paris").unix())*1000).format('mm:ss'));
			
		} else {
			
			$("#europe_west_live_alert_ttbr").addClass("d-none");
			
			// Reset CSS
			
			$("#europe_west_live_alert_ttbr").addClass("d-none");
			
			$("#europe_west_live_card").removeClass("bg-dark");
			$("#europe_west_live_card").removeClass("text-light");
			
			$("#europe_west_live_card .text-secondary").removeClass("text-light");
			
			$("#europe_west_live_latest_ts").removeClass("text-dark");
			$("#europe_west_live_latest_ts").removeClass("fw-bold");
			
			$("#europe_west_live_latest_rel").removeClass("text-light");
			$("#europe_west_live_latest_rel").removeClass("text-danger");
			$("#europe_west_live_latest_rel").removeClass("fw-bold");
			
		}
		
		if ($('#user_prefs_live_regional').is(':checked')) {
			$("#asia_east_live_latest_ts").text(moment.utc(regions["asia-east"].utc).tz("Australia/Sydney").format("h:mm:ss A"));
		} else {
			$("#asia_east_live_latest_ts").text(moment.utc(regions["asia-east"].utc).local().format("h:mm:ss A"));
		}
		$("#asia_east_live_latest_rel").text(moment.utc(regions["asia-east"].utc).tz("Australia/Sydney").fromNow());
		if (moment.utc(regions["asia-east"].utc).tz("Australia/Sydney").isSame(moment().tz("Australia/Sydney"), "day")) {
			$("#asia_east_live_alert_dy").addClass("d-none");
			$("#asia_east_live_alert_dt").removeClass("d-none");
		} else {
			$("#asia_east_live_alert_dy").removeClass("d-none");
			$("#asia_east_live_alert_dt").addClass("d-none");
		}
		if (moment.utc().tz("Australia/Sydney").unix() < (moment.utc(regions["asia-east"].utc).tz("Australia/Sydney").unix() + 120)) {
			
			// Special Styling
			
			$("#asia_east_live_alert_dy").addClass("d-none");
			$("#asia_east_live_alert_dt").addClass("d-none");
			$("#asia_east_live_alert_ttbr").removeClass("d-none");
			
			$("#asia_east_live_card").addClass("bg-dark");
			$("#asia_east_live_card").addClass("text-light");
			
			$("#asia_east_live_card .text-secondary").addClass("text-light");
			
			$("#asia_east_live_latest_ts").addClass("text-dark");
			$("#asia_east_live_latest_ts").addClass("fw-bold");
			
			$("#asia_east_live_latest_rel").removeClass("text-light");
			$("#asia_east_live_latest_rel").addClass("text-danger");
			$("#asia_east_live_latest_rel").addClass("fw-bold");
			
			// Clock
			
			$("#asia_east_live_alert_ttbr_clock").text(moment.utc(((moment.utc(regions["asia-east"].utc).tz("Australia/Sydney").unix() + 120) - moment.utc().tz("Australia/Sydney").unix())*1000).format('mm:ss'));
			
		} else {
			
			$("#asia_east_live_alert_ttbr").addClass("d-none");
			
			// Reset CSS
			
			$("#asia_east_live_alert_ttbr").addClass("d-none");
			
			$("#asia_east_live_card").removeClass("bg-dark");
			$("#asia_east_live_card").removeClass("text-light");
			
			$("#asia_east_live_card .text-secondary").removeClass("text-light");
			
			$("#asia_east_live_latest_ts").removeClass("text-dark");
			$("#asia_east_live_latest_ts").removeClass("fw-bold");
			
			$("#asia_east_live_latest_rel").removeClass("text-light");
			$("#asia_east_live_latest_rel").removeClass("text-danger");
			$("#asia_east_live_latest_rel").removeClass("fw-bold");
			
		}
		
		if ($('#user_prefs_live_regional').is(':checked')) {
			$("#asia_west_live_latest_ts").text(moment.utc(regions["asia-west"].utc).tz("Asia/Karachi").format("h:mm:ss A"));
		} else {
			$("#asia_west_live_latest_ts").text(moment.utc(regions["asia-west"].utc).local().format("h:mm:ss A"));
		}
		$("#asia_west_live_latest_rel").text(moment.utc(regions["asia-west"].utc).tz("Asia/Karachi").fromNow());
		if (moment.utc(regions["asia-west"].utc).tz("Asia/Karachi").isSame(moment().tz("Asia/Karachi"), "day")) {
			$("#asia_west_live_alert_dy").addClass("d-none");
			$("#asia_west_live_alert_dt").removeClass("d-none");
		} else {
			$("#asia_west_live_alert_dy").removeClass("d-none");
			$("#asia_west_live_alert_dt").addClass("d-none");
		}
		if (moment.utc().tz("Asia/Karachi").unix() < (moment.utc(regions["asia-west"].utc).tz("Asia/Karachi").unix() + 120)) {
			
			// Special Styling
			
			$("#asia_west_live_alert_dy").addClass("d-none");
			$("#asia_west_live_alert_dt").addClass("d-none");
			$("#asia_west_live_alert_ttbr").removeClass("d-none");
			
			$("#asia_west_live_card").addClass("bg-dark");
			$("#asia_west_live_card").addClass("text-light");
			
			$("#asia_west_live_card .text-secondary").addClass("text-light");
			
			$("#asia_west_live_latest_ts").addClass("text-dark");
			$("#asia_west_live_latest_ts").addClass("fw-bold");
			
			$("#asia_west_live_latest_rel").removeClass("text-light");
			$("#asia_west_live_latest_rel").addClass("text-danger");
			$("#asia_west_live_latest_rel").addClass("fw-bold");
			
			// Clock
			
			$("#asia_west_live_alert_ttbr_clock").text(moment.utc(((moment.utc(regions["asia-west"].utc).tz("Asia/Karachi").unix() + 120) - moment.utc().tz("Asia/Karachi").unix())*1000).format('mm:ss'));
			
		} else {
			
			$("#asia_west_live_alert_ttbr").addClass("d-none");
			
			// Reset CSS
			
			$("#asia_west_live_alert_ttbr").addClass("d-none");
			
			$("#asia_west_live_card").removeClass("bg-dark");
			$("#asia_west_live_card").removeClass("text-light");
			
			$("#asia_west_live_card .text-secondary").removeClass("text-light");
			
			$("#asia_west_live_latest_ts").removeClass("text-dark");
			$("#asia_west_live_latest_ts").removeClass("fw-bold");
			
			$("#asia_west_live_latest_rel").removeClass("text-light");
			$("#asia_west_live_latest_rel").removeClass("text-danger");
			$("#asia_west_live_latest_rel").removeClass("fw-bold");
			
		}
		
		hideError();

		// us_central.eq(0).text(regions["us-central"].utc);
		// us_central.eq(1).text(moment.utc(regions["us-central"].utc).local().format("ddd, MMM Do, h:mm:ss a")); 
		// us_central.eq(2).text(moment.utc(regions["us-central"].utc).local().fromNow()); 
		// 
		// europe_west.eq(0).text(regions["europe-west"].utc);
		// europe_west.eq(1).text(moment.utc(regions["europe-west"].utc).local().format("ddd, MMM Do, h:mm:ss a")); 
		// europe_west.eq(2).text(moment.utc(regions["europe-west"].utc).local().fromNow()); 
		// 
		// asia_west.eq(0).text(regions["asia-west"].utc);
		// asia_west.eq(1).text(moment.utc(regions["asia-west"].utc).local().format("ddd, MMM Do, h:mm:ss a")); 
		// asia_west.eq(2).text(moment.utc(regions["asia-west"].utc).local().fromNow()); 
		// 
		// asia_east.eq(0).text(regions["asia-east"].utc);
		// asia_east.eq(1).text(moment.utc(regions["asia-east"].utc).local().format("ddd, MMM Do, h:mm:ss a")); 
		// asia_east.eq(2).text(moment.utc(regions["asia-east"].utc).local().fromNow()); 
		
	}

	function failed(xhr, ajaxOptions, thrownError) {
		if (cftsr !== "NONE") {
			switch (xhr.status) {
				case 0:
					showError('bg-danger', 'Network Error', 'Check your internet connection');
				case 403:
					showError('bg-danger', 'Access Denied', 'The server was unable to verify your request. Please refresh the page if this issue persists.');
					break;
				default:
					showError('bg-danger', 'Server Error', 'An unknown error has occured. Please try again later. (' + xhr.status + ')');
					break;
			}
		}
	}
	
}

function showError(css, title, text) {
	
	$("#reqError").removeClass("d-none");
	$("#reqError").addClass(css);
	$("#reqError").text(text);
	$("#reqError").prepend("<b>" + title + "</b><br/>");
	
	retries++;
	
}

function hideError() {
	
	if (retries >= 120) {
		// If 60s has passed since last success
		window.location.reload();
	}
	
	$("#reqError").removeAttr('class');
	$("#reqError").addClass("alert mb-3 text-light d-none");
	
}

function refreshHistory() {
	
	let us_central = $("#us-central-history");
	let europe_west = $("#europe-west-history");
	let asia_east = $("#asia-east-history");
	let asia_west = $("#asia-west-history");
	
	$.ajax({
			dataType: "json",
			url: "https://apis.devinbaeten.com/prod/app/bereal/data/historic_times",
			crossDomain: true,
			jsonpCallback: "callback",
            headers: {
			    "brth-client-auth": cftsr
		    },
			success: callback,
			error: failed
	});
	
	function mkCharts(data, region) {
		
		data = data[region];
		
		switch(region) {
			case 'us-central':
				function addRow(entry) {
					
					let utc = moment.utc(entry.utc).tz("America/Chicago");
					let day = utc.format('YYYY-MM-DD');
					let dayStart = moment.tz(day, "America/Chicago");
					
					let localDate = utc.format("YYYY-MM-DD");
					let localTime = utc.format("hh:mm:ss");
					let localMs = utc.diff(dayStart);
					
					usCentralChartD.push({"x":localDate,"y":localMs});
					
				}
				
				usCentralChartD = [];
				data.forEach(addRow);
				setData(usCentralChart, usCentralChartD);
				
				function setData(chart, data) {
					chart.data.datasets.forEach((dataset) => {
						dataset.data = data;
					});
					chart.update();
				}
				break;
			case 'europe-west':
				function addRow2(entry) {
					
					let utc = moment.utc(entry.utc).tz("Europe/Paris"); // 
					let day = utc.format('YYYY-MM-DD');
					let dayStart = moment.tz(day, "Europe/Paris");
					
					let localDate = utc.format("YYYY-MM-DD");
					let localTime = utc.format("hh:mm:ss");
					let localMs = utc.diff(dayStart);
					
					europeWestChartD.push({"x":localDate,"y":localMs});
					
				}
				
				europeWestChartD = [];
				data.forEach(addRow2);
				setData2(europeWestChart, europeWestChartD);
				
				function setData2(chart, data) {
					chart.data.datasets.forEach((dataset) => {
						dataset.data = data;
					});
					chart.update();
				}
				break;
			case 'asia-east':
				function addRow3(entry) {
					
					let utc = moment.utc(entry.utc).tz("Australia/Sydney");
					let day = utc.format('YYYY-MM-DD');
					let dayStart = moment.tz(day, "Australia/Sydney");
					
					let localDate = utc.format("YYYY-MM-DD");
					let localTime = utc.format("hh:mm:ss");
					let localMs = utc.diff(dayStart);
					
					asiaEastChartD.push({"x":localDate,"y":localMs});
					
				}
				
				asiaEastChartD = [];
				data.forEach(addRow3);
				setData3(asiaEastChart, asiaEastChartD);
				
				function setData3(chart, data) {
					chart.data.datasets.forEach((dataset) => {
						dataset.data = data;
					});
					chart.update();
				}
				break;
			case 'asia-west':
				function addRow4(entry) {
					
					let utc = moment.utc(entry.utc).tz("Asia/Karachi");
					let day = utc.format('YYYY-MM-DD');
					let dayStart = moment.tz(day, "Asia/Karachi");
					
					let localDate = utc.format("YYYY-MM-DD");
					let localTime = utc.format("hh:mm:ss");
					let localMs = utc.diff(dayStart);
					
					asiaWestChartD.push({"x":localDate,"y":localMs});
					
				}
				
				asiaWestChartD = [];
				data.forEach(addRow4);
				setData4(asiaWestChart, asiaWestChartD);
				
				function setData4(chart, data) {
					chart.data.datasets.forEach((dataset) => {
						dataset.data = data;
					});
					chart.update();
				}
				break;
			default:
				return;
		}
		
	}
	
	function mkRows(data) {
		
		let html = '';
		
		function addRow(entry) {
			
			let utc = entry.utc;
			
			let part = '<tr data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here\'s some amazing content. It\'s very engaging. Right?"><td>' + utc + '</td></tr>';
			
			html = html + part;
			
		}

		data.forEach(addRow);
		
		return html;
		
	}
	
	function callback(result) {
	
		var regions = result.regions;
	
		us_central.empty();
		us_central.append(mkRows(regions["us-central"]));
		mkCharts(regions, 'us-central');
		
		europe_west.empty();
		europe_west.append(mkRows(regions["europe-west"]));
		mkCharts(regions, 'europe-west');
		
		asia_east.empty();
		asia_east.append(mkRows(regions["asia-east"]));
		mkCharts(regions, 'asia-east');
		
		asia_west.empty();
		asia_west.append(mkRows(regions["asia-west"]));
		mkCharts(regions, 'asia-west');
		
	}
	
	function failed(xhr, ajaxOptions, thrownError) {
		// window.location.reload();
	}
	
}