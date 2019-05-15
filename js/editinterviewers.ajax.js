const FILENAME = location.href.split("/").slice(-1);

function createInterviewer(formData, newInterviewer) {
	let requestRoute;
	if ( newInterviewer ) {
		requestRoute = RESTROUTE;
	} else {
		requestRoute = RESTROUTE + CURRENTID;
	}
	jso.ajax({
		dataType: 'json',
		url: requestRoute,
		method: 'POST',
		data: formData
	})

	.done(function(object) {
		if ( newInterviewer ) {
			window.location.href = "http://testx1.info/wehirefrontend/interviewers-list.html";
		} else {
			getInterviewer(requestRoute);
		}
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {

	})
}

function generateJSON(newInterviewer) {
	let formData;
	if ( newInterviewer ) {
		formData = {
			"status": "publish",
			"title": $('input[name=title]').val(),
			"cmb2": {
						"interviewer_metabox": {
								"interviewer_name": $('input[name=name]').val(),
								"interviewer_last_name": $('input[name=last_name]').val(),
								"interviewer_email": $('input[name=email]').val(),
								"interviewer_phone_number": $('input[name=phone_number]').val(),
								"interviewer_technologies": $('input[name=technologies]:checked').val()
						}
			}
		};
	}

	createInterviewer(formData, newInterviewer);
}

function monitorFormSubmit(newInterviewer) {
	$(document).on('submit', '#interviewer-form', function(event) {
		event.preventDefault();
		generateJSON(newInterviewer);
	});
}

if ( FILENAME[0] === 'new-interviewer.html' ) {
	var newInterviewer = true;
	monitorFormSubmit(newInterviewer);
}
