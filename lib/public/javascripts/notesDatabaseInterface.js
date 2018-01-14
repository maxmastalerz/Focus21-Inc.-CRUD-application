"use strict";

export function deleteNote(store, _id) {
	var url = "/note/"+_id;
	var params = "";
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
}

export function addNote(noteText) {
	var url = "/note/add";
	var params = "noteText="+noteText;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
}

export function editNote(_id, originalText) {
	var updatedNoteText = prompt("Note content:", originalText);

	var url = "/note/"+_id;
	var params = "noteText="+updatedNoteText;
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
}

export function getNotes(store, search, cb) {
	search = '&'+search.substr(1);
	var url = "/note?dontRender=1"+search;
	var params = "";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
		if(xhr.status === 200) {
			store.dispatch({type: "receivedUpdatedNotes", payload: 0});

			return cb(xhr.responseText);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send(params);
}