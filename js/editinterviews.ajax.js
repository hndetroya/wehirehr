const FILENAME = location.href.split("/").slice(-1);

function createInterview(formData, newInterview) {
	let requestRoute;
	if ( newInterview ) {
		requestRoute = RESTROUTEINTV;
	} else {
		requestRoute = RESTROUTEINTV + CURRENTID;
	}
	jso.ajax({
		dataType: 'json',
		url: requestRoute,
		method: 'POST',
		data: formData
	})

	.done(function(object) {
		if ( newInterview ) {
			window.location.href = "http://testx1.info/wehirefrontend/interviews-list.html";
		} else {
			getInterview(requestRoute);
		}
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {

	})
}

function generateJSON(newInterview) {
	let formData;
	if ( newInterview ) {
		formData = {
			"status": "publish",
			"title": $('input[name=title]').val(),
			"cmb2": {
						"interview_metabox": {
								"interview_interviewer_field": $('input[name=interviewer]:checked').val(),
								"interview_candidate_field": $('input[name=candidate]:checked').val(),
								"interview_interview_date": $('input[name=date]').val(),
								"interview_meeting_link": $('input[name=meeting_link]').val(),
								"interview_rate": $('input[name=rate]').val(),
								"interview_status": $('input[name=status]:checked').val()
						}
			}
		};
	}

	createInterview(formData, newInterview);
}

function monitorFormSubmit(newInterview) {
	$(document).on('submit', '#interview-form', function(event) {
		event.preventDefault();
		generateJSON(newInterview);
	});
}

if ( FILENAME[0] === 'new-interview.html' ) {
	var newInterview = true;
	monitorFormSubmit(newInterview);
}
