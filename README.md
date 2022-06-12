# slidemaker

slidemaker is a small HTML webpage set to generate video from text slides.
It is useful when a message needs to be quickly conveyed without having to open
video editing or other software.

## browser requirements

You need a fairly modern browser supporting `TextMetrics.actualBoundingBoxAscent`
to use slidemaker. This feature was first supported in Chrome 77, Firefox 74, Edge 79,
and Safari 11.1.

__NOTE TO FIREFOX:__ Although support is included, it is _not enabled by default_.
Open `about:config` and change the `dom.textMetrics.fontBoundingBox.enabled` to `true`.
Otherwise, slidemaker will not work.

## known issues
* multiple lines of text may move upwards if rendered a second time
* width and height settings not yet implemented

## licence

slidemaker is licenced under the MIT Licence.

It uses the [whammy](https://github.com/antimatter15/whammy) library, also
under the MIT Licence.
