# Agenda-Elobby (backend) 

Implementación del backend para el proyecto [Agenda Elobby](https://github.com/lynx-agenda/Agenda-Elobby).

## Project set up

Si quieres levantar el servidor en local:

1. Clona el repositorio:

```
git clone https://github.com/lynx-agenda/Agenda-Elobby-backend.git
```

2. Accede a la carpeta Agenda-Elobby-backend y continuación instala las dependencias: 

```
cd Agenda-Elobby-backend
npm install
```

3. Establece el fichero .env con las variables de entorno

```
API_VERSION=v1

HOST=localhost
PORT=27017

DB_PASSWORD=adf782_A
DB_NAME=elobbyDB
DB_USERNAME=lucid-lynx 

SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Third party APIs keys
GOOGLE_BOOKS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TMDB_API_KEY=dXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RAWG_IO_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

REDIS_URL=redis://127.0.0.1:6379
```

4. Levanta el servidor de redis

```
// Install redis server
sudo apt-get install redis

// start redis server
redis-server
```

5. Levanta el backend:

```
npm start
```

Close the local server with CTRL + c.

To restart the local server, run npm start from within the Agenda-Elobby-backend folder.

## Deployment

El backend se encuentra desplegado en Heroku y configurado para desplegarse automáticamente ante cada push que se realice en la rama `main` del proyecto. 

Guía para desplegar una aplicación de Node.js en Heroku: [enlace](https://devcenter.heroku.com/articles/deploying-nodejs)

## Technology Stack

El proyecto se implementó utilizando [Node v14.x] y utilizando las siguientes teconologías: 

* [express](https://expressjs.com/es/) 
* [axios](https://github.com/axios/axios)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [mongoose](https://mongoosejs.com/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [redis](https://redis.com/)
* [npm](https://www.npmjs.com/)

## Members

* [@Winki-hub](https://github.com/Winki-hub): FullStack developer
* [@mlordpen](https://github.com/mlordpen): FullStack developer
* [@Kroalca](https://github.com/Kroalca): FullStack developer
* [@gitfrandu4](https://github.com/gitfrandu4): FullStack developer

## License

[MIT](https://choosealicense.com/licenses/mit/)
