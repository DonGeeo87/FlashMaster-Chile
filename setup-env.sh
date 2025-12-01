#!/bin/bash
# Script Bash para configurar el archivo .env
# Ejecuta este script desde la raíz del proyecto

API_KEY="jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po"

# Crear el archivo .env
echo "PEXELS_API_KEY=$API_KEY" > .env

echo "✅ Archivo .env creado correctamente"
echo "📝 Contenido: PEXELS_API_KEY configurada"
echo ""
echo "⚠️  IMPORTANTE: Reinicia el servidor para que los cambios surtan efecto"
echo "   1. Presiona Ctrl+C en la terminal del servidor"
echo "   2. Ejecuta: npm run dev"

