/**
 * Tech-01: Inheriting from EventEmitter
 * => Problem: Want to use an event-based approach to solve a problem. You have a class that
 *        you’d like to operate when asynchronous events occur.
 * ==> Solution: Using simple prototype, You can creat customized event-base classes with util.inherits
 *        or extends from EventEmitter
 */

const EventEmitter = require('events').EventEmitter;
const util = require('util');

class MusicPlayer {
  constructor() {
    this.playing = false;
    EventEmitter.call(this);
  }
}

util.inherits(MusicPlayer, EventEmitter);

const AudioDevice = {
  play: function(track) {},
  stop: function(){}
};

const musicPlayer = new MusicPlayer();

musicPlayer.on('play', function(track){
  this.playing = true;
  console.log('playing....')
  AudioDevice.play(track);
});

musicPlayer.on('stop', function() {
  this.playing = false;
  console.log('stopped...')
  AudioDevice.stop();
});

musicPlayer.emit('play', 'The Fire');

setTimeout(function() {
  musicPlayer.emit('stop');
}, 1000);

/**
 * Tech-02: Mixing in EventEmitter (sometimes inheritance isn't right way to use EventEmitter)
 * => Problem: Alternate above technique. Rather than using EventEmitter as a base class
 * ==> Solution: Using a for-in loop is sufficient for copying the properties from one prototype to another
 */
/**
 * Tech-03: Managing errors
 * => Problem: You’re using an EventEmitter and want to gracefully handle when errors occur, but it keeps raising exceptions
 * ==> Solution: Add a listener to the error event
 */
function AudioPlayer(song) {
  this.song = song;
  this.playing = false;
  for(const method in EventEmitter.prototype) {
    this[method] = EventEmitter.prototype[method];
  }
}

AudioPlayer.prototype.play = function() {
    if(this.playing) {
      return 'Playing song: ' + this.song;
    } else {
      return 'Stopped';
    }
};

const audioPlayer = new AudioPlayer('Happy new year');
audioPlayer.on('play', function() {
  this.playing = true;
  console.log(this.play());
})

// Handling error
// If there is no listener for it, then the default action is to print a stack trace and exit the program
audioPlayer.on('error', function(err) {
  console.error('Error:', err);
});

audioPlayer.emit('play');

/**
 * Tech-04: Reflection
 * => Problem: You need to either catch when a listener has been added to an emitter, or query the existing listeners.
 * ==> Solution: EventEmitter emits a special event called new-Listener . 
 *       Listeners added to this event will receive the event name and the listener function.
 */

function EventTracker() {
  EventEmitter.call(this);
}
util.inherits(EventTracker, EventEmitter);
const eventTracker = new EventTracker();
eventTracker.on('newListener', function(name, listener) {  // Track whether new listeners added.
  console.log('Event name added:', name);
});
eventTracker.on('pause', function() {
// This will cause 'newListener' to fire
});

/**
 * Tech-05: Categorizing event names
 * => Problem: Your projects have too many events, you're losing track of these one.
 * ==> Solution: use an object to act as a central dictionary for all of the event names.
 */
const eventName = MusicPlayer.events = {
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  ff: 'ff',
  rw: 'rw',
  addTrack: 'add-track'
};
