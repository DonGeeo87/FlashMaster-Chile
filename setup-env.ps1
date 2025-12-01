# Script PowerShell para configurar el archivo .env
# Ejecuta este script desde la raíz del proyecto

$apiKey = "jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po"
$envContent = "PEXELS_API_KEY=$apiKey"

# Crear el archivo .env
$envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline

Write-Host "✅ Archivo .env creado correctamente" -ForegroundColor Green
Write-Host "📝 Contenido: PEXELS_API_KEY configurada" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Reinicia el servidor para que los cambios surtan efecto" -ForegroundColor Yellow
Write-Host "   1. Presiona Ctrl+C en la terminal del servidor" -ForegroundColor Yellow
Write-Host "   2. Ejecuta: npm run dev" -ForegroundColor Yellow

