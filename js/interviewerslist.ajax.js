/**
 * Script for loading the interviewers list.
 *
 * Constant route and variable token inherited from oauth.js.
 */

/**
 * Render HTML output for the list.
 *
 * Receives raw JSON object from the AJAX REST request.
 */
function createInterviewersList(object) {
	$('.interviewers-list').empty().append('<ul></ul>');
	for( let i=0; i<object.length; i++ ) {
		let navListItem =
			'<li>' +
			'<div class="row">' +
			'<div class="col-sm-3">' +
			'<img class="user-image" src="' + IMAGESROUTE + 'user01.png" />' +
			'</div>' +
			'<div class="col-sm-9">' +
			'<h2 class="interviewer-title">' + object[i].title.rendered + '</h2>' +
			'<div class="interviewer-name">Full name: ' + object[i].cmb2.interviewer_metabox.interviewer_name + ' ' + object[i].cmb2.interviewer_metabox.interviewer_last_name +
			'<div class="interviewer-email">Email: ' + object[i].cmb2.interviewer_metabox.interviewer_email +
			'<div class="interviewer-phone-number">Phone number: ' + object[i].cmb2.interviewer_metabox.interviewer_phone_number +
			'<div class="interviewer-technologies">Technologies: ' + object[i].cmb2.interviewer_metabox.interviewer_technologies +
			'</div>' +
			'</div>' +
			'</div>' +
			'</li>';
		$('.interviewers-list ul').append(navListItem);
	}
	console.info(object);
}
/**
 * Run an AJAX REST request with the help of JSO's jQuery wrapper.
 */
function getInterviewersList() {
	// Display the spinner as we wait for the response.
	$(".interviewers-list").append('<div class="loader"><img src="js/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: RESTROUTE
	})

	.done(function(object) {
		createInterviewersList(object);
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
	getInterviewersList();
} else {
	window.location.href = "/";
}