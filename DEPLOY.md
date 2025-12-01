# 🚀 Guía de Despliegue - FlashMaster Chile

**Desarrollador:** Giorgio Interdonato Palacios  
**GitHub:** @DonGeeo87

---

## ✅ Compatibilidad de Despliegue

Este proyecto es una **SPA (Single Page Application) estática** que puede desplegarse en cualquier plataforma de hosting estático:

- ✅ **Vercel** (Recomendado - más fácil)
- ✅ **GitHub Pages**
- ✅ **Netlify**
- ✅ **Cloudflare Pages**
- ✅ Cualquier servidor web estático

**NO requiere:**
- ❌ Backend
- ❌ Firebase
- ❌ Base de datos
- ❌ Servidor Node.js

---

## 📋 Requisitos Previos

Antes de desplegar, necesitas:

1. **API Key de Google Gemini**
   - Obtén una en: https://aistudio.google.com/app/apikey
   - Es gratuita con límites generosos

2. **API Key de Pexels**
   - Obtén una en: https://www.pexels.com/api/
   - Completamente gratuita

3. **Repositorio Git**
   - Código subido a GitHub, GitLab o similar

---

## 🎯 Opción 1: Desplegar en Vercel (Más Fácil)

### Pasos:

1. **Conecta tu repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Click en "Add New Project"
   - Selecciona tu repositorio

2. **Configura el proyecto:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Configura Variables de Entorno:**
   - En la sección "Environment Variables", agrega:
     ```
     PEXELS_API_KEY=tu_api_key_aqui
     ```
   
   **Nota:** Ya no se requiere `GEMINI_API_KEY`. El vocabulario viene predefinido en archivos JSON.

4. **Despliega:**
   - Click en "Deploy"
   - Espera 1-2 minutos
   - ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### Notas:
- Vercel detecta automáticamente Vite
- El archivo `vercel.json` ya está configurado para SPA routing
- Cada push a `main` desplegará automáticamente una nueva versión

---

## 🎯 Opción 2: Desplegar en GitHub Pages

### Pasos:

1. **Habilita GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Source: selecciona "GitHub Actions"

2. **Configura Secrets:**
   - Ve a Settings → Secrets and variables → Actions
   - Agrega el siguiente secret:
     - `PEXELS_API_KEY`
   
   **Nota:** Ya no se requiere `GEMINI_API_KEY`. El vocabulario viene predefinido en archivos JSON.

3. **Haz push a main/master:**
   - El workflow `.github/workflows/deploy-gh-pages.yml` se ejecutará automáticamente
   - Ve a Actions para ver el progreso

4. **Accede a tu sitio:**
   - Tu app estará en: `https://tu-usuario.github.io/tu-repositorio/`

### Configurar Base Path (Si es necesario):

Si tu repositorio no se llama exactamente como esperas, actualiza `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nombre-de-tu-repositorio/',
  // ... resto de la config
});
```

---

## 🔧 Variables de Entorno

Todas las plataformas requieren estas variables:

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `PEXELS_API_KEY` | API Key de Pexels (solo para imágenes) | https://www.pexels.com/api/ |

**⚠️ Importante:** Nunca subas estas keys al repositorio. Úsalas solo como variables de entorno.

---

## 🧪 Verificar el Despliegue

Después de desplegar:

1. ✅ Visita la URL de tu app
2. ✅ Verifica que carga correctamente
3. ✅ Intenta generar un set de flashcards
4. ✅ Verifica que las imágenes se cargan

### Problemas Comunes:

**❌ "Error al generar vocabulario"**
- Verifica que el tema seleccionado tenga vocabulario disponible
- Revisa los logs del navegador para ver el tema exacto que falló
- Algunos temas personalizados pueden no tener vocabulario aún

**❌ "Sin imágenes"**
- Verifica que `PEXELS_API_KEY` esté configurada
- Revisa la consola del navegador para errores de API

**❌ "404 en rutas"**
- Verifica la configuración de rewrites/redirects (SPA routing)
- En Vercel, el `vercel.json` debería manejarlo automáticamente

---

## 🔄 Actualizaciones Automáticas

### Vercel:
- Cada push a `main` desplegará automáticamente
- Pull requests generan preview deployments

### GitHub Pages:
- Cada push a `main` ejecutará el workflow y desplegará
- Revisa Actions tab para ver el estado

---

## 📝 Notas Adicionales

1. **Rate Limits:**
   - Gemini tiene límites de uso gratuitos (generosamente altos)
   - Pexels permite 200 requests por hora (gratis)

2. **Optimización:**
   - El build de Vite ya optimiza el código automáticamente
   - Las imágenes de Pexels se cargan bajo demanda (no afectan el bundle)

3. **Dominio Personalizado:**
   - Tanto Vercel como GitHub Pages permiten dominios personalizados
   - Consulta la documentación de cada plataforma

---

**Fin de la Guía de Despliegue**

