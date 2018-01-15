"use strict";

export function deleteNote(store, _id, cb) {
	let url = "/note/"+_id;
	let params = "";
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
		if(xhr.status === 200) {
			return cb(xhr.responseText);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send(params);
}

export function addNote(noteText, cb) {
	let url = "/note/add";
	let params = "noteText="+noteText;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
		if(xhr.status === 200) {
			return cb(xhr.responseText);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send(params);
}

export function editNote(_id, originalText, cb) {
	let updatedNoteText = prompt("Note content:", originalText);

	let url = "/note/"+_id;
	let params = "noteText="+updatedNoteText;
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function() {
		if(xhr.status === 200) {
			return cb(xhr.responseText);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send(params);
}

export function getNotes(store, search, cb) {
	search = '&'+search.substr(1);
	let url = "/note?dontRender=1"+search;
	let params = "";
	let xhr = new XMLHttpRequest();
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