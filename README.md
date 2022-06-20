# slidemaker

slidemaker is a small HTML webpage set to generate video from text slides.
It is useful when a message needs to be quickly conveyed without having to open
video editing or other software.

## browser requirements

You need a fairly modern browser supporting `TextMetrics.actualBoundingBoxAscent`
to use slidemaker. This feature was first supported in Chrome 77, Firefox 74, Edge 79,
and Safari 11.1.

## known issues
* many lines of text may be too close to each other and collide
* width and height settings not yet implemented

## licence

slidemaker is licenced under the MIT Licence.

It uses the [ts-whammy](https://github.com/Akimyou/ts-whammy) library, also
under the MIT Licence.
