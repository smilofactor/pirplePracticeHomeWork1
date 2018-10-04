# pirplePractice

This first section we are building a RESTful API for an uptime
monitoring application.
Will not be using any NPM packages or modules, instead this project
will be using a number of built-in Node modules.

The goal of this exercise is to accomplish 7 things.
They are:
1) The API listens on a PORT and accepts  incoming HTTP requests for
    POST, GET, PUT, DELETE and HEAD

2) The API allows a client to
    connect, create a new user, then edit and delete that user

3) The API allows a user to sign in which gives them a token 
    that they can use for subsequent authenticatied requests

4) The API allows the user to sign out which invalidates their token

5) The API allows a signed-in user to use their token to create
    a new check

6) The API allows a signed-in user to edit or delete any of their checks

7) In the background, workers perform all the checks at the
    appropriate times and send alerts to the users when a 
    check changes its state from up to down, or visa versa


The user will be alerted vi SMS using Twilio, a home grown
API interface will be made using the exercises in this course.

Will be using the filesystem rather than a JSON based DB at this point.
