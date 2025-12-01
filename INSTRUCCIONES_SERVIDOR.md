# 🚀 Instrucciones para el Servidor Local

**Fecha:** Enero 2025

---

## ✅ Servidor Iniciado

El servidor de desarrollo está corriendo en segundo plano.

### Acceso

**URL:** http://localhost:3000

Abre tu navegador y visita esa URL.

---

## 🔑 Configuración de API Key (Opcional pero recomendado)

Para que las imágenes funcionen, necesitas configurar tu API key de Pexels:

### Opción 1: Crear archivo .env manualmente

Crea un archivo llamado `.env` en la raíz del proyecto con:

```env
PEXELS_API_KEY=tu_api_key_aqui
```

### Opción 2: Obtener API Key

1. Ve a: https://www.pexels.com/api/
2. Crea una cuenta (gratis)
3. Copia tu API key
4. Pégala en el archivo `.env`

**Nota:** La app funcionará sin la API key, pero no mostrará imágenes.

---

## 📋 Temas Disponibles para Probar

### 1° Básico - Temas con vocabulario:

1. ✅ **Colors** - 11 palabras en inglés
2. ✅ **Numbers 1–20** - 10 palabras
3. ✅ **Shapes** - 8 palabras
4. ✅ **Family members** - 8 palabras
5. ✅ **School objects** - 8 palabras
6. ✅ **Animals (pets)** - 8 palabras

---

## 🧪 Cómo Probar

1. **Abre** http://localhost:3000 en tu navegador
2. **Selecciona:**
   - Nivel: 1° Básico
   - Temática: Colors (o cualquiera de las 6 disponibles)
   - Cantidad: 4, 8, 12 o 16 tarjetas
   - Idioma: Inglés o Español
   - Tipo: Imagen + Texto (recomendado para probar imágenes)
3. **Haz clic** en "✨ Crear Flashcards"
4. **Espera** a que se generen (debería ser instantáneo)
5. **Verifica:**
   - ¿Se generan las tarjetas?
   - ¿Aparecen las imágenes? (si configuraste PEXELS_API_KEY)
   - ¿Puedes cambiar una imagen con el botón 🔄?
   - ¿Puedes imprimir el set?

---

## ⚠️ Si hay Problemas

### El servidor no inicia

```bash
# Verifica que esté corriendo
# Presiona Ctrl+C para detener el servidor actual
# Luego ejecuta:
npm run dev
```

### Las imágenes no aparecen

- Verifica que el archivo `.env` existe
- Verifica que `PEXELS_API_KEY` esté configurada
- Revisa la consola del navegador (F12) para ver errores
- La API key de Pexels es gratuita pero tiene límite de 200 requests/hora

### Error al generar flashcards

- Verifica que seleccionaste uno de los 6 temas con vocabulario disponible
- Revisa la consola del navegador para ver el error específico

---

## 🛑 Detener el Servidor

Para detener el servidor, presiona `Ctrl+C` en la terminal donde está corriendo.

---

## 📝 Notas

- El servidor recarga automáticamente cuando cambias código
- Los cambios en archivos JSON requieren recargar la página manualmente
- El servidor está configurado para escuchar en todas las interfaces (0.0.0.0)

---

**¡Listo para probar!** 🎉

