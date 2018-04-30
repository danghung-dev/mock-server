# Mock Server

Mock server for postman
Input postman url => make mock server

## Usage

```bash
$ cp .env.example .env
$ npm install
$ npm start
```

open postman, send request
POST /mock
postman_url: 'https://www.getpostman.com/collections/f524265363'

=> response like
```
{
    "id": "86499bd5-72ca-4f9b-bf34-1b2139d426a0"
}
```

Api is serve at
/mock/86499bd5-72ca-4f9b-bf34-1b2139d426a0/<your-api>