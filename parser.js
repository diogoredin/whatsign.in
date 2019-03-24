document.addEventListener('mousedown', function(event) {
	var tokens = "";

	/* Analyse Element */
	if (event.target !== 'undefined') {
		tokens += parseNodeAttributes(event.target);
		tokens += parseNodeText(event.target);
	}

	/* Analyse Children */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.childNodes !== 'undefined' && event.target.childNodes.length > 0) {
			var children = event.target.childNodes;
			for (var i = 0; i < children.length; i++) {
				tokens += parseNodeAttributes(children[i]);
				tokens += parseNodeText(children[i]);
			}
		}
	}

	/* Analyse Parent */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.parentNode !== 'undefined') {
			tokens += parseNodeAttributes(event.target.parentNode);
			tokens += parseNodeText(event.target.parentNode);
		}
	}

	/* Analyse Grandparent */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.parentNode !== 'undefined' && event.target.parentNode.parentNode !== 'undefined') {
			tokens += parseNodeAttributes(event.target.parentNode.parentNode);
			tokens += parseNodeText(event.target.parentNode.parentNode);
		}
	}

	/* Analyse Siblings */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.parentNode !== 'undefined' && event.target.parentNode.childNodes !== 'undefined' 
			&& event.target.parentNode.childNodes.length > 0) {
			var children = event.target.parentNode.childNodes;
			for (var i = 0; i < children.length; i++) {
				tokens += parseNodeAttributes(children[i]);
				tokens += parseNodeText(children[i]);
			}
		}
	}

	/* Analyse Siblings of Parent */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.parentNode !== 'undefined' && event.target.parentNode.parentNode !== 'undefined' 
			&& event.target.parentNode.parentNode.childNodes !== 'undefined' && event.target.parentNode.parentNode.childNodes.length > 0) {
			var children = event.target.parentNode.parentNode.childNodes;
			for (var i = 0; i < children.length; i++) {
				tokens += parseNodeAttributes(children[i]);
				tokens += parseNodeText(children[i]);
			}
		}
	}

	/* Analyse Siblings of Grandparent */
	if (matchSocial(tokens) == "" || !matchAction(tokens)) {
		if (event.target !== 'undefined' && event.target.parentNode !== 'undefined' && event.target.parentNode.parentNode !== 'undefined' 
			&& event.target.parentNode.parentNode.parentNode !== 'undefined' && event.target.parentNode.parentNode.parentNode.childNodes !== 'undefined'
			&& event.target.parentNode.parentNode.parentNode.childNodes.length > 0) {
			var children = event.target.parentNode.parentNode.parentNode.childNodes;
			for (var i = 0; i < children.length; i++) {
				tokens += parseNodeAttributes(children[i]);
				tokens += parseNodeText(children[i]);
			}
		}
	}

	/* Save the found social network chosen to Sign In - done on background (so its possible to know current tab) */
	if ( matchSocial(tokens) !== "" && matchAction(tokens) ) {
		chrome.runtime.sendMessage({social_found: matchSocial(tokens)});
	}

});

/* Retrieves all attribute values from Node */
function parseNodeAttributes(el) {
	if ( typeof el.attributes === 'undefined' ) { return ""; }

	var nodes=[], values=[];
	for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
		att = atts[i];
		nodes.push(att.nodeName);
		values.push(att.nodeValue);
	}

	return values.toString();
}

/* Retrieves the text from Node */
function parseNodeText(el) {
	if ( el.firstChild === null || typeof el.firstChild.nodeValue === 'undefined' ) { 
		return "";
	} else {
		return el.firstChild.nodeValue;
	}
}

/* Returns true if it finds any of the specified action words */
function matchAction(tokens) {

	var action_tokens = ['login', 'logon', 'log', 'signin', 'signon', 'sign', 'connect', 'register', 'enter', 'continue'];
	var action_found = new Boolean(false);

	for ( var i = 0; i < action_tokens.length; i++ ) {
		var match = new RegExp(action_tokens[i], 'i');
		if ( tokens.search(match) != -1 ) {
			action_found = new Boolean(true);
		}
	}

	return action_found;
}

/* Returns the social network found on the button (if any) */
function matchSocial(tokens) {

	var social_tokens =	['facebook', 'twitter', 'google', 'angellist', 'instagram', 'github', 'linkedin', 'buffer', 'spotify', 'truecaller', 'whatsapp', 'microsoft'];
	var social_found = "";

	for ( var i = 0; i < social_tokens.length; i++ ) {
		var match = new RegExp(social_tokens[i], 'i');
		if ( tokens.search(match) != -1 ) {
			social_found = social_tokens[i];
		}
	}

	return social_found;
}