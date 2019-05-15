const FILENAME = location.href.split("/").slice(-1);

function createCandidate(formData, newCandidate) {
	let requestRoute;
	if ( newCandidate ) {
		requestRoute = RESTROUTECAND;
	} else {
		requestRoute = RESTROUTECAND + CURRENTID;
	}
	jso.ajax({
		dataType: 'json',
		url: requestRoute,
		method: 'POST',
		data: formData
	})

	.done(function(object) {
		if ( newCandidate ) {
			window.location.href = "http://testx1.info/wehirefrontend/candidates-list.html";
		} else {
			getCandidate(requestRoute);
		}
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {

	})
}

function generateJSON(newCandidate) {
	let formData;
	if ( newCandidate ) {
		formData = {
			"status": "publish",
			"title": $('input[name=title]').val(),
			"cmb2": {
						"candidate_metabox": {
								"candidate_name": $('input[name=name]').val(),
								"candidate_last_name": $('input[name=last_name]').val(),
								"candidate_email": $('input[name=email]').val(),
								"candidate_phone_number": $('input[name=phone_number]').val(),
								"candidate_opening": $('input[name=opening]:checked').val()
						}
			}
		};
	}

	createCandidate(formData, newCandidate);
}

function monitorFormSubmit(newCandidate) {
	$(document).on('submit', '#candidate-form', function(event) {
		event.preventDefault();
		generateJSON(newCandidate);
	});
}

if ( FILENAME[0] === 'new-candidate.html' ) {
	var newCandidate = true;
	monitorFormSubmit(newCandidate);
}
