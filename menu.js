document.addEventListener('DOMContentLoaded', function() {

	chrome.tabs.getSelected(null, function(tab) {
		var hostname = (new URL(tab.url)).hostname;
		var tag = "WSI_"+hostname;

		chrome.storage.sync.get(tag, function(data) {
			for ( key in data ) {
				if ( data.hasOwnProperty(tag) ) {
	
					var prefered = data[key];
					document.querySelector('#inner').innerHTML = '<h1 class="current-method">' + prefered.charAt(0).toUpperCase() + prefered.slice(1) + ' prefered</h1>\
					<a href="" id="forget-preference" class="button">Forget</a>';

					document.querySelector('#forget-preference').addEventListener('click', function() {
						chrome.storage.sync.remove(tag);
						document.querySelector('#inner').innerHTML = '<p class="method">No prefered login method saved yet.</p>';
					});

				}
			}
		});
	});

}, false);