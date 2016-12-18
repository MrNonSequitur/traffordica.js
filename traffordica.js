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
	"LShift","z","x","c","v","b","n","m",",",".","/","RShift",
	"CapsLock","a","s","d","f","g","h","j","k","l",";","'",
];

function key2note(key){
return notes[keys.indexOf(key)];
}
document.onkeydown = function (e) {
	e = e || window.event;
	key = e.key;
	if(key == "Control"){chordMode = !chordMode;}
	if(key == "Shift"){key = (e.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT? "L" : "R")+"Shift";}
//need to also work around capslock, possibly by zealous downcasing
	console.log(key+", "+key2note(key));
	if(chordMode){
		//synth.triggerAttackRelease(key2chord[key], "8n");
	} else {
	console.log("playing note");
		synth.triggerAttackRelease([key2note(key)], "8n");
	}
};