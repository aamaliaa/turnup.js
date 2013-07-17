turnup.js
=========

A jQuery plugin that, given a list of strings, continuously grabs one string randomly and "turns it up".

## Example ##

	$('#title').turnup({ list: ['one', 'two', 'three', 'four'] });

Pretty easy. You can also change the css transition and interval of wait time between words.

	$('#title').turnup({
		list: ['Grey Wind', 'Lady', 'Nymeria', 'Summer', 'Shaggy Dog'],
		transition: 'all 250ms ease',
		interval: 450
	});

## Options ##

* `list: ['one', 'two', 'three', 'four']` - an array of strings
* `transition: 'all 250ms ease'` - valid css string
* `interval: 450` - time between words (in milliseconds)

## Public Methods ##

If you want to stop an instance after it has been instantiated, just tell it to stop.

	$('#title').turnup('stop');

Then you can also turn up again!

	$('#title').turnup('start');