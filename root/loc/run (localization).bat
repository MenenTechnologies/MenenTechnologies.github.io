>run_log.txt (
	@REM echo PULLING TRANSLATIONS
	@REM call serge pull-ts config.nconf
	
	echo TRANSLATING
	call serge localize config.nconf
	
	@REM echo PUSHING TRANSLATIONS
	@REM call serge push-ts config.nconf
	
	echo:
	echo COPYING FILES
	copy /y ..\..\navbar.html ..\..\es\navbar.html
	copy /y ..\..\projects.html ..\..\es\projects.html
)
