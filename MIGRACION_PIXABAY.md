# 🎨 Migración a Pixabay - Ilustraciones para Niños

**Fecha:** Enero 2025  
**Desarrollador:** Giorgio Interdonato Palacios  
**GitHub:** @DonGeeo87

---

## ✅ Cambios Implementados

### 1. Nuevo Servicio de Imágenes

**Archivo creado:** `services/pixabayService.ts`

- ✅ Servicio completo para Pixabay API
- ✅ Filtro por ilustraciones (`image_type=illustration`)
- ✅ Categoría educativa (`category=education`)
- ✅ SafeSearch activado para contenido seguro
- ✅ Fallback si no encuentra en categoría educación

### 2. Servicios Actualizados

- ✅ `services/vocabularyService.ts` - Ahora usa Pixabay
- ✅ `components/FlashcardItem.tsx` - Actualizado para Pixabay
- ✅ `vite.config.ts` - Agregado soporte para `PIXABAY_API_KEY`

---

## 🔑 Configuración Requerida

### Obtener API Key de Pixabay

1. Ve a: https://pixabay.com/api/docs/
2. Crea una cuenta gratuita (si no tienes)
3. Obtén tu API key
4. **Límite gratuito:** 5,000 requests/mes (más que suficiente)

### Configurar Variables de Entorno

**Actualiza tu archivo `.env`:**

```env
# Pixabay API Key (para ilustraciones y dibujos)
PIXABAY_API_KEY=tu_api_key_de_pixabay

# Opcional: Mantener Pexels como fallback
PEXELS_API_KEY=jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po
```

---

## 🚀 Reiniciar Servidor

**IMPORTANTE:** Debes reiniciar el servidor para que cargue la nueva API key.

1. Presiona `Ctrl+C` en la terminal del servidor
2. Ejecuta: `npm run dev`
3. Recarga la página (F5)

---

## 🎨 Ventajas de Pixabay

### Para Contenido Infantil:

✅ **Ilustraciones y dibujos** - No fotos reales  
✅ **Categoría educativa** - Contenido apropiado  
✅ **SafeSearch** - Filtro de contenido seguro  
✅ **Gran variedad** - Miles de ilustraciones educativas  
✅ **Gratis** - 5,000 requests/mes  

### Comparación:

| Característica | Pexels | Pixabay |
|----------------|--------|---------|
| Tipo de contenido | Fotos reales | Ilustraciones + Fotos |
| Filtro por ilustraciones | ❌ | ✅ |
| Categoría educación | ❌ | ✅ |
| SafeSearch | ❌ | ✅ |
| Límite gratuito | 200 req/hora | 5,000 req/mes |

---

## 🧪 Probar la Nueva Implementación

1. **Configura la API key** en `.env`
2. **Reinicia el servidor**
3. **Genera flashcards** con cualquier tema
4. **Verifica** que las imágenes sean ilustraciones/dibujos

### Ejemplo de búsqueda:

- **Keyword:** "red apple isolated"
- **Resultado:** Ilustración de una manzana roja (no foto real)
- **Categoría:** Educación
- **SafeSearch:** Activado

---

## 📝 Notas Técnicas

### Parámetros de Búsqueda Usados:

- `image_type=illustration` - Solo ilustraciones
- `category=education` - Contenido educativo
- `safesearch=true` - Contenido seguro
- `order=popular` - Resultados más populares primero
- `per_page=20` - Pool de imágenes para selección

### Fallback:

Si no encuentra ilustraciones en la categoría "education", intenta sin categoría pero manteniendo `image_type=illustration` y `safesearch=true`.

---

## 🔄 Rollback (Si es necesario)

Si necesitas volver a Pexels:

1. Cambia en `services/vocabularyService.ts`:
   ```typescript
   import { fetchPexelsImage, regenerateCardImage } from "./pexelsService";
   ```

2. Y en la función:
   ```typescript
   imageUrl = await fetchPexelsImage(item.imageKeyword);
   ```

3. Reinicia el servidor

---

## ✅ Checklist de Verificación

- [ ] API key de Pixabay obtenida
- [ ] Archivo `.env` actualizado con `PIXABAY_API_KEY`
- [ ] Servidor reiniciado
- [ ] Página recargada
- [ ] Flashcards generadas con ilustraciones
- [ ] Imágenes son dibujos/ilustraciones (no fotos)

---

**¡Listo! Ahora las flashcards mostrarán ilustraciones y dibujos perfectos para niños.** 🎨

