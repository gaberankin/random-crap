JQUERY.DOGE
===========
When I saw [jquery-raptorize](http://zurb.com/playground/jquery-raptorize) I thought "Hahaha that's neat.  It makes a velopciraptor run across your screen"

People that know me know that I am somewhat strange, which is why my next logical jump was "what if I could improve on this with everyone's favorite meme?"

So I wasted the first part of my workday one day making changes to the raptorize code to fit with my idea.  Please note that what I am saying is that I was not responsible for 100% of the code, just part of it.  My workflow consisted of converting the provided javascript from jquery-raptorize to coffeescript, fixing what the coffeescript converter broke, and then adding the things that I want the plugin to do.

I removed the konami code (which I couldn't get to work anyway), and made several versions of the doge image, pointed in different directions.  My current plan is to have it pick a random version of the doge, along with an associated animation, and run that animation.  I also plan to add a bit of a wiggle to the initial part of the animation for comedy's sake.

I did this because I am a hateful person, but that doesn't mean it has to ruin your day.

Wait no that didn't make much sense.

USAGE
-----
You need 7 files:

  + the 6 `doge-head-[direction].png` images
  + `jquery.doge.js` or `jquery.doge.min.js`

You also need [jquery](http://jquery.com/download/).

Include jquery and the jquery.doge scripts into your page.  Also, keep in mind the path that you've saved the doge images to, as you may need to specify where your browser can find them.  More on that below

Assuming you want to make the doge animation occur on an element click, do the following (make sure you're in a `$(document).ready()` or at the end of your script):

```js
$("#my-element-selector").doge({
	enterOn: 'click',
	imagePath: 'js'
});
```

The above example has two options used.  
  + `enterOn` can be either 'click' or 'timer'.  
    + If you use 'timer' the plugin will fire after a certain length of time.  You can define the length of time by passing the `delayTime` option, which takes milliseconds.  The default value for `delayTime` is 5000 milliseconds, or 5 seconds.
  + `imagePath` is by default just a blank string.  This should be defined so that the browser can find the images (otherwise you will have 404 errors).  This is one thing I added to improve upon the raptorize script, as it didn't appear to be configurable.

If you want to make your own modifications to the script, I've supplied the project files I've used to build it, along with the example files.  With [nodejs](http://nodejs.org/) installed, first do the following in your terminal:

`npm install`

This should install the dependancies for the project's build process, including grunt.

Then, when you want to do a build, 

`grunt`