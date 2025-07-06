
# world-building-tool
A Tool to help building a fantasy world

## Avvio tramite Docker Compose

1. **Costruisci ed esegui il container**:

   ```sh
   docker compose up --build
   ```

   L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000)

2. **Fermare i container**:

   Premi `CTRL+C` nel terminale oppure esegui:

   ```sh
   docker compose down
   ```

## Comandi manuali Docker (opzionale)

Per costruire l'immagine manualmente:

```sh
docker build -t worldbuilding-tool .
```

Per eseguire il container manualmente:

```sh
docker run -p 3000:80 worldbuilding-tool
```
