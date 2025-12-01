# Script para configurar Pixabay API Key
# Ejecuta: .\configurar-pixabay.ps1

$apiKey = Read-Host "Ingresa tu API Key de Pixabay (o presiona Enter para usar la de ejemplo de la documentación)"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "⚠️  No se ingresó una API key. Debes obtener una en: https://pixabay.com/api/docs/" -ForegroundColor Yellow
    Write-Host "💡 O puedes editar este script y agregar tu API key directamente" -ForegroundColor Cyan
    exit
}

# Crear o actualizar archivo .env
$envContent = "PIXABAY_API_KEY=$apiKey`n"

# Si el archivo .env ya existe, leerlo y actualizar solo PIXABAY_API_KEY
if (Test-Path .env) {
    $existingContent = Get-Content .env
    $newContent = @()
    $found = $false
    
    foreach ($line in $existingContent) {
        if ($line -match "^PIXABAY_API_KEY=") {
            $newContent += "PIXABAY_API_KEY=$apiKey"
            $found = $true
        } else {
            $newContent += $line
        }
    }
    
    if (-not $found) {
        $newContent += "PIXABAY_API_KEY=$apiKey"
    }
    
    $newContent | Out-File -FilePath ".env" -Encoding utf8
} else {
    # Crear nuevo archivo .env
    $envContent | Out-File -FilePath ".env" -Encoding utf8
}

Write-Host "✅ Archivo .env configurado correctamente!" -ForegroundColor Green
Write-Host "📝 PIXABAY_API_KEY configurada" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Reinicia el servidor para que los cambios surtan efecto" -ForegroundColor Yellow
Write-Host "   1. Presiona Ctrl+C en la terminal del servidor" -ForegroundColor Yellow
Write-Host "   2. Ejecuta: npm run dev" -ForegroundColor Yellow
Write-Host "   3. Recarga la página (F5)" -ForegroundColor Yellow

