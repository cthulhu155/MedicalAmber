#!/bin/bash

echo "Deteniendo y eliminando contenedores existentes..."
docker stop my-expo-app-container || true
docker rm my-expo-app-container || true

echo "Construyendo la imagen Docker..."
docker build -t my-expo-app .

echo "Iniciando el contenedor..."
docker run -d \
  -p 19000:19000 \
  -p 19001:19001 \
  -p 19002:19002 \
  -p 19006:19006 \
  --name my-expo-app-container \
  my-expo-app

echo "Mostrando logs del contenedor..."
docker logs -f my-expo-app-container