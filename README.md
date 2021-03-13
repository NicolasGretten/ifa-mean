# Evaluation finale by Nicolas Gretten

## Additional packages used :
- Moment for date format
- npm-run-all

## Data Examples :
### Bill :
J'ai ajouté 3 champ de type booléen pour permettre le rendu du Graph sur le dashboard.
```
{
  "billNumber": 1,
  "date": "2021-03-11T15:35:00.000Z",
  "description": "",
  "client": {
    "idclient": 1,
    "firstname": "John",
    "lastname": "Doe"
  },
  "prestations": [{
    "description": "Test description",
    "qty": 2,
    "price": 450.00
  },
  {
    "description": "TOTO",
    "qty": 2,
    "price": 950.00
  }],
  "discount": 0.00,
  "paid": 0.00,
  "tva": true,
  "tvaRate": 20,
  "allPaid":false,
  "waiting": true,
  "revival":false
}
```
### Client
```
{
  "firstname": "John",
  "lastname": "Doe",
  "phone": "06 23 56 98 74",
  "function": "Directeur",
  "email": "john@doe.fr",
  "company": "orange",
  "added_at": "2021-03-12T12:00:00.000Z",
  "prestations": {
    "address_line_1": "2 rue de la poupée,qui dort",
    "address_line_2": "",
    "zip_code": "57000",
    "city": "Metz",
    "country": "FRANCE"
  }
}
```
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run the application with npm-run-all
```
npm run start
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
