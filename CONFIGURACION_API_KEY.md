# 🔑 Configurar API Key de Pexels

**Estado actual:** La app funciona, pero las imágenes no se cargan porque falta la API key.

---

## ✅ Pasos para Configurar

### 1. Crear archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto (misma carpeta que `package.json`) con este contenido:

```env
PEXELS_API_KEY=jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po
```

### 2. Reiniciar el servidor

**Importante:** El servidor necesita reiniciarse para cargar las variables de entorno.

1. Ve a la terminal donde está corriendo `npm run dev`
2. Presiona `Ctrl+C` para detenerlo
3. Ejecuta de nuevo: `npm run dev`

### 3. Recargar la página

Una vez reiniciado el servidor:
- Recarga la página en el navegador (F5)
- Ahora deberías ver las imágenes cargándose

---

## 🧪 Probar que Funciona

1. Selecciona un tema que tenga vocabulario (ej: "Colors", "Numbers 1–20")
2. Haz clic en "Crear Flashcards"
3. Las imágenes deberían aparecer automáticamente

---

## ⚠️ Notas

- El archivo `.env` NO debe subirse a Git (ya está en .gitignore)
- La API key es gratuita con límite de 200 requests/hora
- Si no reinicias el servidor, las imágenes seguirán sin aparecer

---

**¡Listo! Una vez configurado, las imágenes deberían cargarse automáticamente.**

