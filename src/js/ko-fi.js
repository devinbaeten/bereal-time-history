//
//	ko-fi.js
//	BeReal Time History
//
//	Created by Devin Baeten on 2023-03-03.
//

// Create a new script element
const script = document.createElement('script');

// Set the source URL for the script
script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';

// Add the script to the HTML <body> section
document.body.appendChild(script);

// Wait for the script to finish loading
script.onload = function () {
  // Draw the widget
  kofiWidgetOverlay.draw('devinbaeten', {
	'type': 'floating-chat',
	'floating-chat.donateButton.text': 'Support me',
	'floating-chat.donateButton.background-color': '#d9534f',
	'floating-chat.donateButton.text-color': '#fff'
  });
};

