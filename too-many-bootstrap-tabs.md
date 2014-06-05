---
layout: default
---
## Too many goddamn bootstrap tabs make people whine about things

The project I work on uses <a href="http://getbootstrap.com/" target="_blank">bootstrap</a>.  This was actually a decision I made because we were drowning under custom css for so many forms.  It's a pretty good framework, and a lot of the built in interface elements are super helpful.

Unfortunately, it doesn't always fit with what you need.  See, I had a tabbed interface.  It was built with a server-side command that read through all the possible categories of settings an object could have.  Recently, I got to the point that some objects had over 12 or even 14 categories, which caused the tabs to wrap around.

I looked around the internet for a while, trying to find some solution.  At minimum, I would have been happy with a scrollbar underneath the tabs (although that's pretty ugly).  I did find <a href="http://www.eyecon.ro/bootstrap-tabdrop/">one person</a> who built a jquery plugin that would automatically check the interface width, see how many tabs fit, and put the other tabs in a bootstrap dropdown.  However, it was pretty old (it didn't appear to have been updated since bootstrap 2, and I work with bootstrap 3), so I was a little worried about compatability.

You know what?  I am a dang programmer.  I'll do this myself _just to see if I can_

```javascript
// Get the container.  in this case, i've got it in a <ul> with id="setting-tabs-container"
var $tabContainer = $("#setting-tabs-container");

// Get the tabs in the page under the container.  While I'm at it, I'm going to initialize the sizes so I don't have to 
//	recalculate them every time the function runs by placing the value in the jQuery.data() of the tab.
var $tabs = $("> li", $tabContainer).each(function(){
	var w = $(this).outerWidth();
	$(this).data("tab-width", w);
});

// timer that will cause the function to run.  This prevents it from running too often while the resize event executes
var tabResizeTimer = null;

//flag because I am lazy.
var tabdropdown = false;

// html code for dropdown.
var dropHtml = '<li class="dropdown">\
				<a href="#" id="tab-more" class="dropdown-toggle" data-toggle="dropdown">More <b class="caret"></b></a>\
				<ul class="dropdown-menu" role="menu" aria-labelledby="tab-more"></ul></li>';

// bind event
$(window).resize(function(){
	// ok.  if the timer is waiting, kill the timer
	if(tabResizeTimer != null) {
		clearTimeout(tabResizeTimer);
	}

	//set up timer.  the function here is where the work actually happens.
	tabResizeTimer = setTimeout(function(){
		var tc_width = $tabContainer.width();	//current width of container.
		var t_width = 0;	//use this for checking the width of the sum of the tab widths.
		var $ok = $([]);	//i dont even know why i need this.
		var $notok = $([]);	//i definitely need this.  it's used to keep references to the tabs we want to move.

		//figure out which tabs need to be moved into a dropdown.
		$tabs.each(function(){
			t_width += $(this).data("tab-width");
			if((t_width + 77) < tc_width) { // 77 = width of "more" dropdown tab.  I am lazy.  I said this already.
				$ok = $ok.add(this);
			} else {
				$notok = $notok.add(this);	//add tab to the list of tabs we need to move.
			}
		});
		if($notok.size() > 0) {	//in this case, we have tabs that should be moved.
			// re-render tabs with dropdown.
			var $drop = $("li.dropdown", $tabContainer);
			if($drop.size() > 0) {	//dropdown exists.  move stuff out of it first.
				$("li", $drop).each(function(){
					var $t = $(this);
					//.detach() is cool because it doesn't destroy the .data() already applied to the tabs.
					//	also, note the selector here.  what I am doing is inserting the tabs after the last non-dropdown
					//	tab.  This could cause a problem if there are no tabs.
					//	Crap.  I hadn't thought of that until now.
					$t.detach().insertAfter($("> li:not(.dropdown):last", $tabContainer));
				});
			} else {
				//dropdown doesn't exist - add it to the tab container
				$drop = $(dropHtml).appendTo($tabContainer);
			}
			// now loop through each tab, detach it from the tab container and re-insert it into the dropdown.
			$notok.each(function(){
				$t = $(this);
				$t.detach().appendTo($("ul.dropdown-menu", $drop));
			});
			tabdropdown = true;	//flag because I am lazy.
		} else if(tabdropdown) {
			//no tabs to move, but we have a dropdown, so we need to move things out of the dropdown
			//	and put them into the tab container, then remove the dropdown.

			var $drop = $("li.dropdown", $tabContainer);	//get the dropdown <li>
			//get the dropdown's members and put them back into the tab container.
			$("li", $drop).each(function(){
				var $t = $(this);
				$t.detach().appendTo($tabContainer);
			});
			$drop.remove();
			tabdropdown = false;
		}
		tabResizeTimer = null;
	}, 200);	// 1/5 second delay.
}).trigger("resize");

```

When I implemented this, it worked like a charm.  I haven't put it through the QA department yet.  They will probably find something wrong with it.  They generally do.

