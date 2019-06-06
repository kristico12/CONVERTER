Esqueleto inicial para el desarrollo de aplicaciones de escritorio utilizando electron js y react

-Dentro de la carpeta Raiz, el archivo index.js lanza la aplicacion desarrollada en electron
-Dentro de la carpeta src, el archivo app.js tiene la entrada a la libreria react

SCRIPTS:
1) en la consola escribir "npm run webpack", este lanza el cliente webpack que empaqueta el codigo en la carpeta /public > bundle.js, recarga los cambios en caliente hechos en react
2) en otra consola excribir "npm start", este lanza la aplicacion de electron y tambien detecta los cambios hechos y recarga en caliente hechas a nivel de codigo, a nivel de configuracion de electron hay que vovler a ejecutar "npm start"

Note: Este proyecto utiliza styled como formato de estilos de css si desea usar otro, puede instalarlo y configurar