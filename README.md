# dbpa-control-gui

dbpa-control-gui is a web-based graphical user inteface for controlling dbpa-manage, the Database Process Automation Job Manager.
(https://github.com/rdesantis/hauldata)

dbpa-manage exposes a RESTful web service API.  In the development environment, dbpa-manage API must be visible to dbpa-control-gui at
http://localhost:8080/api.  The dbpa-manage server must enable CORS so that dbpa-control-gui can connect from pages served by
http://localhost:4200/.

In the production environment, dbpa-manage is expected to serve dbpa-control-gui as static content and to expose the API at /api on the same port.
Therefore CORS is not needed in production.

This project was initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
