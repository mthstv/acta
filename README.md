# Frontend
[Template](https://dali110.github.io/react-material-admin/)

Copy environment example file
```
cp .env.example .env
```

The app will be hosted on http://localhost

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

```
docker exec -ti acta_app /bin/bash
```

The app will be hosted on http://localhost:8080
