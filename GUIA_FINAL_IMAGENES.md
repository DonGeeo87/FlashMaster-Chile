# 🖼️ Guía Final: Configurar Imágenes de Pexels

**Estado:** Configuración lista, solo falta reiniciar el servidor

---

## ✅ Lo que ya está hecho

1. ✅ Servicio de Pexels configurado correctamente
2. ✅ Vite configurado para leer variables de entorno
3. ✅ Scripts de configuración creados
4. ✅ Manejo de errores mejorado

---

## 🔧 Configuración Final (1 paso)

### Crear archivo `.env`

El archivo `.env` debería estar creado, pero si no existe, créalo manualmente:

**Ubicación:** En la raíz del proyecto (misma carpeta que `package.json`)

**Contenido:**
```env
PEXELS_API_KEY=jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po
```

**O ejecuta el script:**
```powershell
.\setup-env.ps1
```

---

## 🚀 Reiniciar el Servidor (IMPORTANTE)

**⚠️ CRÍTICO:** El servidor DEBE reiniciarse para cargar las variables de entorno.

1. Ve a la terminal donde está corriendo `npm run dev`
2. Presiona `Ctrl+C` para detenerlo
3. Ejecuta de nuevo: `npm run dev`
4. Espera a que inicie (verás el mensaje con la URL)

---

## 🧪 Probar que Funciona

1. Abre http://localhost:3000
2. Selecciona:
   - Nivel: **1° Básico**
   - Temática: **Colors** (o cualquier tema disponible)
   - Tipo: **Imagen + Texto**
   - Cantidad: **4 u 8 tarjetas**
3. Haz clic en "✨ Crear Flashcards"
4. **Las imágenes deberían cargarse automáticamente** ✨

---

## 🔍 Verificar que Funciona

### ✅ Señales de éxito:
- Las imágenes aparecen en las tarjetas
- No hay errores en la consola del navegador
- Las imágenes son diferentes para cada tarjeta

### ❌ Si no funciona:
1. Verifica que el archivo `.env` existe en la raíz
2. Verifica que contiene: `PEXELS_API_KEY=jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po`
3. **Asegúrate de haber reiniciado el servidor** (muy importante)
4. Revisa la consola del navegador (F12) para errores

---

## 📝 Notas Técnicas

- La API key es gratuita con límite de **200 requests/hora**
- Las imágenes se cargan desde Pexels en tiempo real
- Puedes cambiar imágenes individualmente con el botón 🔄
- El archivo `.env` NO se sube a Git (está en .gitignore)

---

## 🎯 Resultado Esperado

Una vez configurado correctamente, deberías ver:
- ✅ Tarjetas con imágenes reales de Pexels
- ✅ Imágenes relevantes al vocabulario
- ✅ Variedad de imágenes (no repetidas)
- ✅ Botón 🔄 para cambiar imágenes individuales

---

**¡Todo listo! Solo reinicia el servidor y las imágenes funcionarán automáticamente.** 🚀

