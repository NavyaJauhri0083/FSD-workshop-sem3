# Assignment 2: Products REST API

## Run

```bash
npm install
npm start
```

The API runs at `http://localhost:3000`.

## Endpoints

- `GET /api/products` - return all 100 seeded products
- `GET /api/products/:id` - return one product
- `POST /api/products` - create a product
- `PUT /api/products/:id` - update a product
- `DELETE /api/products/:id` - delete a product

Example request body:

```json
{
  "name": "Wireless Mouse",
  "description": "A comfortable wireless mouse",
  "price": 24.99,
  "category": "Electronics",
  "inStock": true
}
```
