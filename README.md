#Cordova/PhoneGap and AngularJS: An introduction

0.  Initialize your environment

	npm install -g phonegap yeoman generator-angular

1.  Create an empty PhoneGap project

    phone gap create photo-diary --name PhotoDiary --id be.mstaessen.photodiary

2.  Create an empty AngularJS project

	- Backup original www folder
    
    	mv www www.bak

    - Create new www dir and initialize AngularJS project

    	mkdir www && cd $_
    	yo angular PhoneDiary
	    	[?] Would you like to include Twitter Bootstrap?: No
			[?] Would you like to include angular-resource.js?: Yes
			[?] Would you like to include angular-cookies.js?: No
			[?] Would you like to include angular-sanitize.js?: No

3.  Setup Project
	
	- uninstall es5-shim and json3 because we are not using Internet Explorer

		bower uninstall json3 --save
		bower uninstall es5-shim --save

	- install foundation
	- install angular-phonegap

4.  Start coding!