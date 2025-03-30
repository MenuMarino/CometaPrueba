# Fullstack Challenge

## Ejecutar el proyecto

### Backend

1. Crear un environment de Python para instalar las librerias necesarias: `python -m venv <name>` y activar este environment:

- Windows: `source <name>/Scripts/activate`
- macOS: `source <name>/bin/activate`

2. Instalar las librerias: `pip install -r requirements`
3. Iniciar el backend: `fastapi dev app/main.py`

Para ejecutar las pruebas unitarias se debe ejecutar `pytest`.

### Frontend

1. Instalar las librerias con `npm install`
2. Crear un archivo `.env.local` con la ruta del backend: `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`
3. Iniciar el frontend utilizando `npm run dev` y en el navegador abrir `http://localhost:3000/`

## Demostracion

El video la ejecucion del proyecto se encuentra en [este archivo](media/demostracion.mkv) y tambien se puede visualizar en [Google Drive](https://drive.google.com/file/d/13cVNJw_QDx2o99S4AaDpGLoMhf85ExMD/view?usp=sharing)

## API Endpoints

### `/api/stock` — `GET`

Response:

```json
{
  "last_updated": "2025-03-30T14:47:45.277973",
  "beers": [
    {
      "name": "Corona",
      "price": 115,
      "quantity": 10
    },
    {
      "name": "Quilmes",
      "price": 120,
      "quantity": 10
    },
    {
      "name": "Club Colombia",
      "price": 110,
      "quantity": 10
    }
  ]
}
```

### `/api/orders` — `GET`

Response:

```json
[
    {
        "id": 1,
        "created": "2025-03-30T14:21:53.160619",
        "paid": true,
        "subtotal": 590,
        "taxes": 0,
        "discounts": 0,
        "items": [
            {
                "name": "Corona",
                "price": 115,
                "quantity": 2
            },
            {
                "name": "Quilmes",
                "price": 120,
                "quantity": 3
            }
        ]
    },
    ...
]
```

### `/api/orders` — `POST`

Request:

```json
{
  "Quilmes": 1
}
```

Response:

```json
{
  "id": 6,
  "created": "2025-03-30T14:49:07.856343",
  "paid": false,
  "subtotal": 120,
  "taxes": 0,
  "discounts": 0,
  "items": [
    {
      "name": "Quilmes",
      "price": 120,
      "quantity": 1
    }
  ]
}
```

### `/api/orders/{id}` - `PATCH`

Response:

```json
{
  "id": 1,
  "created": "2025-03-30T14:21:53.160619",
  "paid": true,
  "subtotal": 590,
  "taxes": 0,
  "discounts": 0,
  "items": [
    {
      "name": "Corona",
      "price": 115,
      "quantity": 2
    },
    {
      "name": "Quilmes",
      "price": 120,
      "quantity": 3
    }
  ]
}
```
