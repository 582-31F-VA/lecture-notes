# Progressive enhancement

Progressive enhancement is a strategy that emphasizes accessibility,
allowing everyone to access the basic content and functionality of a web
page, while users with additional browser features or faster Internet
access receive the enhanced version instead. This strategy speeds up
loading and facilitates crawling by web search engines, as text on a
page is loaded immediately through the HTML source code rather than
having to wait for JavaScript to initiate and load the content.

This strategy involves separating content from presentation and
interactivity, with the latter two being implemented in one or more
optional layers, activated based on aspects of the browser or Internet
connection of the client. If the user's browser only supports HTML, they
get content and forms. If it also supports styles and fonts, the
application looks better. If it can run JavaScript, the user gains extra
interactions. But only the core HTML is required in order to meet users'
basic needs. This means serving content through HTML, the "lowest common
denominator" of web standards, and applying styling and animation
through CSS to the technically possible extent, then applying further
enhancements through JavaScript.

Obviously there are many places where JavaScript could be seen to be a
requirement. It's hard to imagine intensive web applications like games
and online office suites working without JavaScript. Even in these cases
though there are possibilities to use progressive enhancement to benefit
the user. Take Google's spreadsheet web application Sheets, which would
seem at first glance to be an obvious place where JavaScript might be
required. Sure enough, if you load a spreadsheet without JavaScript
enabled you get a notice at the top of the page warning you of problems.
What's good though is that in the absence of JavaScript the user is
presented with a non-editable view of the data. This feels like a good
compromise: without a script layer the interaction is curtailed, but the
document still exists.
