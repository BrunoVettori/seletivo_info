Para rodar o programa siga estes passos

instalar node e npm

rodar npm install

rodar npm run build

colocar os seguintes dados no .env

POSTGRES_DB_IP=db-postgresql-nyc1-96088-do-user-14237696-0.b.db.ondigitalocean.com
POSTGRES_DB_USER=info
POSTGRES_DB_PORT=25060
POSTGRES_DB_DATABASE=Info
POSTGRES_DB_PASSWORD=AVNS_eVykxwvvqHjxcVnY12F

rodar npm tun dev

no insomnia/postman colocar as seguintes requisições

CREATE - POST - http://localhost:3000/carro

--------- BODY ---------

{
	"placa": "BRA2018", 
	"chassi": "84T2u6SSB3Kwc5773", 
	"renavam": "482024952", 
	"modelo": "strada", 
	"marca": "fiat", 
	"ano": 2021
}

--------- BODY ---------


GET ALL - GET - http://localhost:3000/carro

GET BY PLACA - GET - http://localhost:3000/carro/:BRA2018

UPDATE - UPDATE - http://localhost:3000/carro

--------- BODY ---------

{
	"placa_original": "BRA2019", 
	"placa": "BRA2019", 
	"chassi": "84TSu5SSB3Kwc3772", 
	"renavam": "481024772", 
	"modelo": "strada", 
	"marca": "fiat", 
	"ano": 2021
}

--------- BODY ---------

DELETE - DELETE - http://localhost:3000/carro

--------- BODY ---------

{
	"placa": "BRA2018"
}

--------- BODY ---------