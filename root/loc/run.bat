>run_log.txt (
	echo PULLING TRANSLATIONS
	call serge pull-ts config.nconf
	
	echo TRANSLATING
	call serge localize config.nconf
	
	echo PUSHING TRANSLATIONS
	call serge push-ts config.nconf
	
	echo:
	echo COPYING FILES
	copy /y ..\..\navbar.html ..\..\es\navbar.html
	copy /y ..\..\projects.html ..\..\es\projects.html
)
