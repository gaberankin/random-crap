random-crap
===========

Nothing to see here.  just me, experimenting with things.

timeline guffins
----------------
So, a project from last year for work fell on its face.  It happens.  You pick yourself up, dust yourself off, and learn from it.

In this case, I was building what basically amounted to a graphical ad-break editor that had a timeline (which represents a video duration) with ad break objects inside (basically rectangles that users could drag and resize to change position and duration of breaks).

The reason it didn't work out well was how I had implemented the timeline.  I had a `<div>` for every second.  When you're dealing with a video that is several hours long, that is a very dumb thing you are doing.  Don't do that.

We moved on, but I never felt like I had come away from the project in a satisfactory manner.  I only learned that building an HTML element with several thousand objects and then trying to use those objects to keep track of time is a dumb thing to do.

So now, I'm messing around with different toolkits.  First, I tried out backbone.js.  I didn't get very far.  Then I tried out kinetic.js.  I got a little farther, and I like the `<canvas>` as it seemed to cut down on the number of elements rendered.

Now, however, I'm messing with d3, which is a javascript library commonly used in charts and svg manipulation.  This may be the way I ultimately go if I can get the user interactions working correctly (right now I'm trying to set up a nice way to zoom in and out of the entire timeline.  Right now, you're locked to a very small portion).  The true test will be how it handles large amounts of time.

jquery.doge.js
--------------
For some reason, everyone hates the doge meme.  [I am one of those lame people that find amusement in it](http://gaberankin.github.io/random-crap/doge.html).  After spending unnecessary amounts of time on this code, I put it on our project's login page on April 1st.  Hilarity ensued.  Also, a lot of github issues were logged because people think they are funny too.  However, they are wrong.

bootstrap tab overflow thingy
-----------------------------
Basically, I had too many bootstrap tabs and they wrapped around the page.  People complained.  I found a solution.  You won't find this in the repo - [the code is on this project's github page](http://gaberankin.github.io/random-crap/too-many-bootstrap-tabs.html)