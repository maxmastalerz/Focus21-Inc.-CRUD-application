import { createStore } from "redux";
import { deleteNote, addNote, editNote, getNotes } from './notesDatabaseInterface.js';

const reducer = function(state, action) {
	if(action.type === "deletedNote") {
		var result = action.payload;
		console.log(result);
	} else if(action.type === "receivedUpdatedNotes") {
		var result = action.payload;
		console.log(result);
	}
	return state;
}

const store = createStore(reducer, 0);
store.subscribe(() => {
	console.log("STATE CHANGE");
});

module.exports = {
	getNotes: function(search, cb) {
		return getNotes(store, search, cb);
	},
	addNote: function(noteText, cb) {
		return addNote(noteText, cb);
	},
	deleteNote: function(_id, cb) {
		return deleteNote(store, _id, cb);
	},
	editNote: function(_id, originalText, cb) {
		return editNote(_id, originalText, cb);
	}
}