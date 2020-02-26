# Frontend
[Template](https://dali110.github.io/react-material-admin/)

Build Dockerfile
```
docker build -t acta-frontend
```

Run Dockerfile
```
docker run --name acta-frontend -p 80:80 -d acta-frontend
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

The app will be hosted on http://localhost:8080
