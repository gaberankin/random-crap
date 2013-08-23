random-crap
===========

Nothing to see here.  just me, experimenting with things.

iframe-test
-----------
Contains experimentation with cross-document & cross-domain message passing, between an iframe and its parent window.

This is, of course, before i learned that IE10 introduced MessageChannels (microsoft doing weird things?  **WHO KNEW??**).  Regardless, I plan to update this code when i get time so that it checks for MessageChannel support and falls back to base window.postMessage();
