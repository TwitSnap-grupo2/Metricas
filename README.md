# Metricas

[![Coverage Status](https://coveralls.io/repos/github/TwitSnap-grupo2/Metricas/badge.svg?branch=main)](https://coveralls.io/github/TwitSnap-grupo2/Metricas?branch=main)

## Levantar app:

- Development

```bash
docker compose up app --build
```

- Produccion

```bash
docker compose up production --build
```

## Generar docu de swagger

```bash
npx ts-node src/swagger.ts
```

- Luego para acceder, una vez este el servicio online, ir a:
  - url/api-docs
