/**
 * Script for loading the interviews list.
 *
 * Constant route and variable token inherited from oauth.js.
 */

/**
 * Render HTML output for the list.
 *
 * Receives raw JSON object from the AJAX REST request.
 */
function createInterviewsList(object) {
	$('.interviews-list').empty().append('<ul></ul>');
	for( let i=0; i<object.length; i++ ) {
		let navListItem =
			'<li>' +
			'<div class="row">' +
			'<div class="col-sm-3">' +
			'<img class="user-image" src="' + IMAGESROUTE + 'user01.png" />' +
			'</div>' +
			'<div class="col-sm-9">' +
			'<h2 class="interview-title">' + object[i].title.rendered + '</h2>' +
			'<div class="interviewer">Interviewer: ' + object[i].cmb2.interview_metabox.interview_interviewer_field +
			'<div class="candidate">Candidate: ' + object[i].cmb2.interview_metabox.interview_candidate_field +
			'<div class="date">Date: ' + object[i].cmb2.interview_metabox.interview_interview_date +
			'<div class="meeting-link">Meeting link: ' + object[i].cmb2.interview_metabox.interview_meeting_link +
			'<div class="rate">Rate: ' + object[i].cmb2.interview_metabox.interview_rate +
			'<div class="status">Status: ' + object[i].cmb2.interview_metabox.interview_status +
			'</div>' +
			'</div>' +
			'</div>' +
			'</li>';
		$('.interviews-list ul').append(navListItem);
	}
	console.info(object);
}
/**
 * Run an AJAX REST request with the help of JSO's jQuery wrapper.
 */
function getInterviewsList() {
	// Display the spinner as we wait for the response.
	$(".interviews-list").append('<div class="loader"><img src="js/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: RESTROUTEINTV
	})

	.done(function(object) {
		createInterviewsList(object);
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
	getInterviewsList();
} else {
	window.location.href = "/";
}