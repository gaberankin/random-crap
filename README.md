random-crap
===========

Nothing to see here.  just me, experimenting with things.

iframe-test
-----------
Contains experimentation with cross-document & cross-domain message passing, between an iframe and its parent window.

This is, of course, before i learned that IE10 introduced MessageChannels (microsoft doing weird things?  **WHO KNEW??**).  Regardless, I plan to update this code when i get time so that it checks for MessageChannel support and falls back to base window.postMessage();

flask-proj
----------
This is me, messing around with a python web framework called [flask](http://flask.pocoo.org/), as well as experimenting with the [peewee database interface](https://github.com/coleifer/peewee).  I don't get to do much python, so this was a fun jaunt down whatever.

timeline guffins
----------------
So, a project from last year for work fell on its face.  It happens.  You pick yourself up, dust yourself off, and learn from it.

In this case, I was building what basically amounted to a graphical ad-break editor that had a timeline (which represents a video duration) with ad break objects inside (basically rectangles that users could drag and resize to change position and duration of breaks).

The reason it didn't work out well was how I had implemented the timeline.  I had a `<div>` for every second.  When you're dealing with a video that is several hours long, that is a very dumb thing you are doing.  Don't do that.

We moved on, but I never felt like I had come away from the project in a satisfactory manner.  I only learned that building an HTML element with several thousand objects and then trying to use those objects to keep track of time is a dumb thing to do.

So now, I'm messing around with different toolkits.  First, I tried out backbone.js.  I didn't get very far.  Then I tried out kinetic.js.  I got a little farther, and I like the `<canvas>` as it seemed to cut down on the number of elements rendered.
Now, however, I'm messing with d3, which is a javascript library commonly used in charts and svg manipulation.  This may be the way I ultimately go if I can get the user interactions working correctly (right now I'm trying to set up a nice way to zoom in and out of the entire timeline.  Right now, you're locked to a very small portion).  The true test will be how it handles large amounts of time.