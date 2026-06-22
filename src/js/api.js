//
//	api.js
//	BeReal Time History
//
//	Created by Devin Baeten on 2023-06-16.
//

const API_BASE_URI = "https://bereal.devin.rest/";

export function getJson(endpoint, successCallback, errorCallback) {
	$.ajax({
		dataType: "json",
		url: API_BASE_URI + endpoint,
		crossDomain: true,
		jsonpCallback: "callback",
		headers: {
			"brth-client-auth": cftsr //assuming cftsr is globally available
		},
		success: successCallback,
		error: errorCallback
	});
}
