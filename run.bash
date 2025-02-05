#!/bin/bash
echo "Iniciando MedicalAmber con Docker..."
docker build -t medicalamber .
docker run -p 8081:8081 --rm medicalamber

