var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var chordMode = false;
var note;
const octave = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

notes = [];//big array of all the notes we want to have available
for(var i = 3; i <= 7; i++){//populate the array of notes
	for(var j=0; j < 12; j++){
		notes.push(octave[j]+i);
	}
}

keys = [ //keep in mind that this array is upside down, but still goes left-to-right, as it should
	"lshift","z","x","c","v","b","n","m",",",".","/","rshift",
	"capslock","a","s","d","f","g","h","j","k","l",";","'",
	"q","w","e","r","t","y","u","i","o","p","[","]",
	"1","2","3","4","5","6","7","8","9","0","-","=",
	"f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"
];

majors = [
	["c4","e4","g4"],
	["db4","f4","ab4"],
	["d4","f#4","a4"],
	["eb4","g4","bb4"],
	["e4","g#4","b4"],
	["f4","a4","c5"],
	["f#4","a#4","c#5"],
	["g4","b4","d5"],
	["ab4","c5","eb5"],
	["a4","c#5","e5"],
	["bb4","d5","f5"],
	["b4","d#5","f#5"],
];
minors = [
	["c4","eb4","g4"],
	["c#4","e4","g#4"],
	["d4","f4","a4"],
	["eb4","gb4","bb4"],
	["e4","g4","b4"],
	["f4","ab4","c5"],
	["f#4","a4","c#5"],
	["g4","bb4","d5"],
	["g#4","b4","d#5"],
	["a4","c5","e5"],
	["bb4","db5","f5"],
	["b4","d5","f#5"],
];

chords = minors.concat(majors);

function key2note(key){
return notes[keys.indexOf(key)];
}

function key2chord(key){
return chords[keys.indexOf(key)];
}

document.onkeydown = function (e) {
	e = e || window.event;
	key = e.key;
	e.preventDefault();
	if(key == "Control"){chordMode = !chordMode;}
	if(key == "Shift"){key = (e.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT? "L" : "R")+"Shift";}
  key = key.toLowerCase();
	console.log(key+", "+key2note(key)+", "+key2chord(key));
	if(chordMode){
		synth.triggerAttackRelease(key2chord(key), "8n");
	} else {
		console.log(synth.triggerAttackRelease([key2note(key)], "8n"));
	}
};