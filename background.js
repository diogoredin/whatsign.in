/* Activated when a social button is clicked to save the preference */
chrome.runtime.onMessage.addListener(function(message) {
	if ( message.social_found !== 'undefined' ) {

		/* Finds the current tab - Careful if you change it because it has to handle popups */
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
			var hostname = (new URL(tabs[0].url)).hostname;
			var tag = "WSI_" + hostname;
			chrome.storage.sync.set({ [tag]: message.social_found });
		});

	}
});