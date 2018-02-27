# Angular 4 Meets Salesforce
# Starter Kit 


### Pre-requisites
1. npm version 3.x or higher
2. node version 6.9.x or higher 

### Getting set up

1. Clone this repository 
2. npm instal 
3. npm rm -g gulp
4. npm install -g gulp-cli


#Running the applicaiton 
gulp default to start local dev server at localhost:8085
gulp deploy to deploy to sandbox 

If everything worked `gulp -v` should give you a version number over 4.

also modify the `config.js` and fill out the pertenent information. It should look like this:

```javascript
module.exports = {
    deploy: {
        username:       'user.name@yourcompany.com',
        password:       'YourPasswordAndPossiblySecurityToken',
        login_url:      'https://test.salesforce.com',
        api_version:    36.0,
        timeout:        120000,
        poll_interval:  5000,
    },

    visualforce: {
        template: 'index.page.html',
        page: 'AngularApp',
        controller: 'AngularAppController'
    },

    resources: {
        app_resource_name: 'AngularApp',
        node_module_resource_name: 'NodeModules',
    },

    options: {
        
    }
}
```

### Running the example

This starter kit comes with a working example of a **contact management application**. To get it running just run the `gulp` command while in the sf_angular4_starter directory. It will open a local server at [http://localhost:8080](http://localhost:8080) where you should be able to view the working application. When you're ready to deploy the application and test it in Salesforce just run `gulp deploy` and wait for the application to finish deploying.

#### gulp

The gulp directory contains most of the gulp tasks separated into different files.

+ deploy.js - Contains tasks specific to deployment such as the task that creates the package.xml and the actual jsforce-deploy task.
    - **Tasks**
    - clean-tmp
    - clean-build
    - clean-resources
    - init-deploy
    - tempgen:visualforce
    - tempgen:node_modules
    - tempgen:app
    - tempgen:salesforce
    - tempgen:pxml
    - tempgen:meta-xml
    - package:node_modules
    - package:app
    - package-resources
    - tempgen
    - deploy:jsforce
    - **deploy**
    - **deploy:classes**
+ html.js - Contains the tasks that add template values to the html file and can also turn it into a visualforce page
    - **Tasks**
    - html:dev
    - html:prod
    - visualforce:dev
    - visualforce:prod
    - **watch:html**
+ scripts.js - Contains tasks that compile Typescript and move javascript files to the build directory
    - **Tasks**
    - typescript:dev
    - typescript:prod
    - javascript:dev
    - javascript:prod
    - **scripts:dev**
    - **scripts:prod**
    - **watch:scripts**
+ styles.js - Contains tasks that compile SASS and move css files to the build directory
    - **Tasks**
    - sass:dev
    - sass:prod
    - css:dev
    - css:prod
    - **styles:dev**
    - **styles:prod**
    - **watch:styles**

The main gulp tasks are located in `gulpfile.js` in the root directory. They are:

+ serve - starts the local development server
+ watch:all - Watches scripts, styles, and html and compiles on change
+ default - starts the server and watches files

#### src

The `src` directory contains all of the Source files; Typescript, javascript, sass, html/visualforce, and salesforce specific such as APEX classes.

##### app

The app directory contains all of the Angular 2 files. These are separated into categories such as `components`, `directives`, `pipes`, `resolves`, `services`, and `shared`.

##### salesforce

The salesforce directory is packaged up and deployed with the resource. You can add any Salesforce files you want here such as APEX Classes.

##### styles

Fairly self explanitory the styles directory contains global styles for the app.

### Known Issues
+ Visualforce Remoting and WebServices use different date formats. I have tried to compensate for those differences in the Salesforce service with the `parseSoapResult` and `convertDate` methods, but I may have missed an edge case.

### Orginal Fork from 

Copyright (c) 2010-2016 Chris Watson
