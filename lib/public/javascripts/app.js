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
	addNote: function(noteText) {
		return addNote(noteText);
	},
	deleteNote: function(_id) {
		return deleteNote(store, _id);
	},
	editNote: function(_id, originalText) {
		return editNote(_id, originalText);
	}
}