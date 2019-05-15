// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "http://testx1.info/wehire/01";
const RESTROOT = ROOTURL + '/wp-json';
const RESTROUTE = RESTROOT + '/wp/v2/interviewer/';
const RESTROUTECAND = RESTROOT + '/wp/v2/candidate/';
const RESTROUTEINTV = RESTROOT + '/wp/v2/interview/';
const IMAGESROUTE = 'http://testx1.info/wehirefrontend/images/';

var jso = new JSO({
	providerID: "wehiremain",
	client_id: "XHe9iAkXMWc5W56GW5EhCKfq9hRVmTe2MD2ZDe2n",
	redirect_uri: "http://testx1.info/wehirefrontend/interviewers-list.html",
	authorization: ROOTURL + "/oauth/authorize"
});

// Catch the response after login:
jso.callback();

var token = localStorage.getItem('tokens-wehiremain');


// Trigger OAuth 2 authentication sequence:
function oauthLogin() {

	jso.getToken();

}

// Log out and wipe all memory of the session:
function oauthLogout() {
	jso.wipeTokens();
}

// Monitor the login button:
$('#login').click(function() {
    oauthLogin();
});

// Monitor the logout button:
$('#logout').click(function() {
    oauthLogout();
	window.location.href = "http://testx1.info/wehirefrontend";
});

(function() {
	// If we are on the home page, redirect to tasklist.html:
	if ( location.pathname == "http://testx1.info/wehirefrontend" ) {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			window.location.href = "http://testx1.info/wehirefrontend/interviewers-list.html";
		}

	} else {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			// Enable JSO jQuery wrapper:
			JSO.enablejQuery($);
		} else {
			// If we're not logged in, redirect to the login page:
			// window.location.href = "http://testx1.info/wehire/frontend";
		}
	}
})();
