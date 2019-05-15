/**
 * Script for loading the candidates list.
 *
 * Constant route and variable token inherited from oauth.js.
 */

/**
 * Render HTML output for the list.
 *
 * Receives raw JSON object from the AJAX REST request.
 */
function createCandidatesList(object) {
	$('.candidates-list').empty().append('<ul></ul>');
	for( let i=0; i<object.length; i++ ) {
		let navListItem =
			'<li>' +
			'<div class="row">' +
			'<div class="col-sm-3">' +
			'<img class="user-image" src="' + IMAGESROUTE + 'user01.png" />' +
			'</div>' +
			'<div class="col-sm-9">' +
			'<h2 class="candidate-title">' + object[i].title.rendered + '</h2>' +
			'<div class="candidate-name">Full name: ' + object[i].cmb2.candidate_metabox.candidate_name + ' ' + object[i].cmb2.candidate_metabox.candidate_last_name +
			'<div class="candidate-email">Email: ' + object[i].cmb2.candidate_metabox.candidate_email +
			'<div class="candidate-phone-number">Phone number: ' + object[i].cmb2.candidate_metabox.candidate_phone_number +
			'<div class="candidate-opening">Opening/Position: ' + object[i].cmb2.candidate_metabox.candidate_opening +
			'</div>' +
			'</div>' +
			'</div>' +
			'</li>';
		$('.candidates-list ul').append(navListItem);
	}
	console.info(object);
}
/**
 * Run an AJAX REST request with the help of JSO's jQuery wrapper.
 */
function getCandidatesList() {
	// Display the spinner as we wait for the response.
	$(".candidates-list").append('<div class="loader"><img src="js/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: RESTROUTECAND
	})

	.done(function(object) {
		createCandidatesList(object);
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		// Remove the spinner when response is received.
		$('.loader').remove();
	})
}

if ( token !== null ) {
	getCandidatesList();
} else {
	window.location.href = "/";
}