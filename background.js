/* Activated when a social button is clicked to save the preference */
chrome.runtime.onMessage.addListener(function(message) {
	if ( message.social_found !== 'undefined' ) {

		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

			var hostname = (new URL(tabs[0].url)).hostname;
			var tag = "WSI_" + hostname;

			chrome.storage.sync.get(tag, function(data) {
	
				if (typeof data[tag] === 'undefined') {
					chrome.storage.sync.set({ [tag]: message.social_found });
				}

			});
		});

	}
});