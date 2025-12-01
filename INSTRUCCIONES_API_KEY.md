# 🔑 Configurar API Key de Pixabay

**Problema:** La consola muestra: `⚠️ PIXABAY_API_KEY no está configurada`

---

## ⚡ Solución Rápida

### Opción 1: Usar el Script (Recomendado)

Ejecuta en PowerShell:

```powershell
.\configurar-pixabay.ps1
```

Ingresa tu API key cuando te la pida.

### Opción 2: Crear Manualmente

1. Crea un archivo llamado `.env` en la raíz del proyecto
2. Agrega esta línea:

```env
PIXABAY_API_KEY=tu_api_key_aqui
```

---

## 🎯 Obtener API Key de Pixabay

1. Ve a: **https://pixabay.com/api/docs/**
2. Crea una cuenta gratuita (si no tienes)
3. Copia tu API key
4. Pégalo en el archivo `.env`

**Nota:** La API key de ejemplo en la documentación (`53483852-2b6856c3a18b463f0f3f8af90`) NO funcionará. Necesitas tu propia API key.

---

## 🚀 Después de Configurar

**IMPORTANTE:** Reinicia el servidor:

1. Presiona `Ctrl+C` en la terminal
2. Ejecuta: `npm run dev`
3. Recarga la página (F5)

---

## ✅ Verificar que Funciona

Una vez configurado y reiniciado:
- ✅ No deberías ver el mensaje de error en la consola
- ✅ Las imágenes deberían cargarse
- ✅ Las imágenes serán ilustraciones/dibujos (no fotos reales)

---

**¡Solo necesitas tu API key de Pixabay y reiniciar el servidor!**

