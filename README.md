#PhotoDiary

This is a simple application to illustrate the combined use of PhoneGap/Cordova and AngularJS.

Any questions? Drop me an email: staessenmichiel at gmail dot com

##How this application came to life

0.  Initialize your development environment

        npm install -g phonegap yeoman generator-angular

1.  Create an empty PhoneGap project and go to the project folder

        phonegap create photo-diary --name PhotoDiary --id be.mstaessen.photodiary
        cd photo-diary

2.  Configure your application for AngularJS
    - Create an empty AngularJS project
        
        ```
        yo angular PhotoDiary
    	    [?] Would you like to include Twitter Bootstrap?: No
            [?] Would you like to include angular-resource.js?: Yes
            [?] Would you like to include angular-cookies.js?: No
            [?] Would you like to include angular-sanitize.js?: No
        ```
    - Move your config.xml file from `www/` to `app/`
        
        ```
        mv www/config.xml app
        ```
    - Modify Grunt tasks such that the build lands in `www/`

        ```
    	var yeomanConfig = {
        	app: 'app',		// Source folder: app/
        	dist: 'www' 	// Build folder: www/ (instead of dist/)
    	};
        
    	copy.dist.files[0].src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp,svg}',
            'styles/fonts/*',
            'config.xml'	// <-- This file is needed for the cordova/phonegap build tool!
        ];
        ```
3.  Start coding!	
	- Uninstall es5-shim and json3 because we are not using Internet Explorer

        ```
		bower uninstall json3 --save
		bower uninstall es5-shim --save
        ```
	- Install angular-phonegap and link in `index.html`

        ```
		bower install angular-phonegap --save
        ```
	- Import other libraries (currently not in bower) and link in `index.html`
		* Twitter Bootstrap glyphicons (https://github.com/twbs/bootstrap-glyphicons)
		* Twitter Bootstrap 3 (git clone && make bootstrap)
	- Create 

		* a service for backend integration
            
            ```
			yo angular:service PhotoService
            ```
		* a new AngularJS route for taking pictures

            ```
			yo angular:route shoot 
            ```
		* a directives for the google map
			
            ```
			yo angular:directive gmap
            ```
		* a directive for the back button
	
            ```
			yo angular:directive back
            ```
	- Get to work (see how the browser reloads when you modify your code)!

        ```
		grunt server
        ```
4.  Build!
	- Build HTML/JS/CSS files
	
        ```
		grunt
        ```
	- Add Android and iOS as target platforms

        ```
		cordova platforms add android ios
        ```
	- Build the platforms

        ```
		phonegap build android
		phonegap build ios
        ```
	- Run on connected Android device

        ```
		phonegap install android
        ```
	- Run on iOS device (open Xcode project and deploy from there, restriction due to signing issues)

        ```
		open platforms/ios/PhotoDiary.xcodeproj
        ```
