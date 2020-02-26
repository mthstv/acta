init:
	cd api; cp .env.example .env
	cd front; cp .env.example .env; npm install ;npm run build