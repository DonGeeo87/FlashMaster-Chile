# 🎨 Configurar Pixabay API - Ilustraciones para Niños

**Estado:** Migración completada ✅

---

## 🔑 Obtener API Key de Pixabay

### Pasos:

1. **Ve a:** https://pixabay.com/api/docs/
2. **Crea una cuenta** (si no tienes una)
3. **Obtén tu API key** (gratuita)
4. **Límite:** 5,000 requests/mes (más que suficiente)

---

## ⚙️ Configurar Variables de Entorno

### Actualizar archivo `.env`

Abre el archivo `.env` en la raíz del proyecto y agrega:

```env
PIXABAY_API_KEY=tu_api_key_de_pixabay_aqui
```

**Ejemplo:**
```env
PIXABAY_API_KEY=53483852-2b6856c3a18b463f0f3f8af90
```

---

## 🚀 Reiniciar Servidor

**IMPORTANTE:** El servidor debe reiniciarse para cargar la nueva API key.

1. Presiona `Ctrl+C` en la terminal donde corre `npm run dev`
2. Ejecuta: `npm run dev`
3. Recarga la página (F5)

---

## 🧪 Probar que Funciona

1. Abre http://localhost:3000
2. Selecciona un tema (ej: "Colors")
3. Haz clic en "✨ Crear Flashcards"
4. **Verifica:** Las imágenes deberían ser ilustraciones/dibujos (no fotos reales)

---

## ✅ Ventajas de Pixabay

- 🎨 **Ilustraciones y dibujos** - Perfectos para niños
- 📚 **Categoría educativa** - Contenido apropiado
- 🔒 **SafeSearch** - Contenido seguro
- 🆓 **Gratis** - 5,000 requests/mes
- 🎯 **Relevancia** - Búsqueda optimizada para educación

---

## ⚠️ Si las Imágenes No Aparecen

1. Verifica que el archivo `.env` existe
2. Verifica que contiene: `PIXABAY_API_KEY=tu_key`
3. **Asegúrate de haber reiniciado el servidor**
4. Revisa la consola del navegador (F12) para errores

---

**¡Listo! Ahora tendrás ilustraciones y dibujos perfectos para niños.** 🎨

