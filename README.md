# Artè

    Arte is an angular based music application that uses Spotify API to let you find the right music for every moment. This application allow user to:
    1. Search Tracks
    2. Search Albums
    3. Search Artists
    4. Access and Create playlist

## Description of files

    1. It includes two main folders named Arte which is for front end and other is Middleware which is for backend middleware.
    2. Under Arte, there is a src folder which contains all application related Angular components.
    3. All web APIs are called in client.service file which basically acts as controller of MVC component.
    4. app-routing module contains all routes of application, which call specific components based on request URLs.
    5. package.json defines all dev dependencies.
    6. app.js file in Middleware folder contains all backend realated declaration and port definition.

## Prerequisites

    1. Visual Code studio or similar IDE
    2. Git Bash
    3. Node.js version 10.9.0 or later.
    4. NPM package manager
    5. Angular CLI version 8.3.19.


## Installation

    1. Clone the repository `git clone https://github.com/neu-mis-info6150-fall-2019/final-project-angular-avengers.git'.
    2. Navigate to project directory `cd Arte`.
    3. Run `npm install` to install angular libraries.
    4. Then navigate to project directory 'Middleware' and run `npm install` to install node libraries.
    5. create an account on developer spotify and whitelist IP and add callback URL.
    6. Bydefault, Middleware runs on 3000 port.

## Build and run the application
    1. To build the app, run `npm run build`.
    2. Run `ng serve` to start angular server. By default application will run on 4200 port with url http://localhost:4200/
    3. Run `node server.js` command to start node server. Node server is set to run on port 3000.

## Versioning
- We use GitHub and Git bash for version controlling.

## References

1. [Spotify Web API](https://developer.spotify.com/web-api/)
2. [Spotify Web API Endpoints](https://developer.spotify.com/web-api/endpoint-reference/)