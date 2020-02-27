# Frontend
[Template](https://dali110.github.io/react-material-admin/)

Copy environment example file
```
cp .env.example .env
```

Install dependencies
```
npm install
```

Run development server
```
npm start
```
The app will be hosted on http://localhost:3000


Generate production build
```
npm run build
```
This command will automatically use .env.dev and copy the build to the API's assets/js folder and will be hosted on http://localhost inside API's docker nginx server.


# Backend

[Docker tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose-pt)


Copy environment example file
```
cp .env.example .env
```

Run docker (-d flag for daemon)
```
docker-compose up -d
```

Running migrations
```
docker-compose exec app php artisan migrate:refresh
```

Generate the jwt key
```
docker-compose exec app php artisan jwt:secret
```

Execute container inside the server
```
docker exec -ti acta_app /bin/bash
```

The API will be hosted on http://localhost:8080 and the Frontend app will be hosted on http://localhost
