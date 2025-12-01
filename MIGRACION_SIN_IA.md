# 🔄 Migración a Sistema Sin IA - FlashMaster Chile

**Desarrollador:** Giorgio Interdonato Palacios  
**GitHub:** @DonGeeo87  
**Fecha:** Enero 2025

---

## ✅ Cambios Realizados

### 1. Nuevo Sistema de Vocabulario Predefinido

**Antes:**
- Dependencia de Google Gemini API para generar vocabulario
- Requería conexión a internet y API key
- Latencia al generar contenido

**Ahora:**
- Vocabulario predefinido en archivos JSON
- Funciona 100% offline (excepto imágenes de Pexels)
- Generación instantánea
- Control total sobre el contenido educativo

### 2. Estructura de Archivos

```
data/
  vocabulary/
    base.json           - Vocabulario para 1°-2° Básico
    intermediate.json   - Vocabulario para 3°-6° Básico
    advanced.json       - Vocabulario para 7°-8° Básico y Medios (pendiente)
```

### 3. Servicios Actualizados

- ✅ `services/vocabularyService.ts` - Nuevo servicio sin IA
- ✅ `services/pexelsService.ts` - Servicio de imágenes separado
- ✅ `App.tsx` - Actualizado para usar nuevo servicio
- ✅ `components/FlashcardItem.tsx` - Actualizado para nuevo servicio

### 4. Configuración

- ✅ `tsconfig.json` - Habilitado `resolveJsonModule` para importar JSON
- ✅ `constants.ts` - Actualizado con todas las temáticas de los profesores

---

## 📋 Estado del Vocabulario

### ✅ Completado

**1° Básico:**
- Colors (Colores) - ✅ 11 palabras EN + 5 ES
- Numbers 1–20 (Números) - ✅ 10 palabras
- Animals (pets) - ✅ 8 palabras (Animales de granja)

### 🔄 En Progreso

**1° Básico:**
- Shapes
- Family members
- School objects
- Toys
- Clothes (básico)
- Weather simple
- Food (favorite foods)
- Actions (run, jump, clap)
- Feelings (happy, sad, scared)

**2° Básico:**
- Animals (wild vs. farm)
- Food 🥗 (frutas, vegetales, snacks)
- Daily routines
- Jobs 👷‍♂️
- Means of transport 🚗
- Places in town 🏙️
- House & rooms 🏠
- Weather expanded ⛅
- Adjectives simple

**Otros niveles:** Pendiente de crear

---

## 🎯 Próximos Pasos

### Prioridad Alta

1. **Completar vocabulario para 1° Básico**
   - Todas las 12 temáticas solicitadas
   - Mínimo 8-12 palabras por tema

2. **Completar vocabulario para 2° Básico**
   - Todas las 9 temáticas solicitadas
   - Mínimo 8-12 palabras por tema

3. **Actualizar normalización de temas**
   - Asegurar que coincidan exactamente con `constants.ts`
   - Mejorar la función `normalizeTopic()` para más flexibilidad

### Prioridad Media

4. **Crear vocabulario para 3°-4° Básico**
5. **Crear vocabulario para 5°-8° Básico**
6. **Crear vocabulario para 1°-4° Medio**

---

## 📝 Formato del Vocabulario

Cada palabra debe tener:

```json
{
  "term": "Palabra en idioma objetivo",
  "translation": "Traducción",
  "definition": "Definición simple apropiada para el nivel",
  "imageKeyword": "keyword específico en inglés para Pexels"
}
```

### Ejemplo:

```json
{
  "term": "Red",
  "translation": "Rojo",
  "definition": "A primary color like fire or apples",
  "imageKeyword": "red apple isolated"
}
```

**Reglas para `imageKeyword`:**
- Siempre en inglés
- Específico y concreto (evitar conceptos abstractos)
- 2-4 palabras descriptivas
- Pensado para stock photos (Pexels)
- Ejemplos:
  - ✅ "happy child smiling" (no solo "happy")
  - ✅ "red apple isolated" (no solo "red")
  - ✅ "person running track" (no solo "run")

---

## 🔧 Cómo Agregar Nuevo Vocabulario

1. **Editar archivo JSON apropiado:**
   - `base.json` para 1°-2° Básico
   - `intermediate.json` para 3°-6° Básico
   - `advanced.json` para 7°-8° y Medios

2. **Agregar tema si no existe:**
```json
"Nombre del Tema": {
  "en": [...palabras...],
  "es": [...palabras...]
}
```

3. **Agregar palabras al tema:**
```json
"en": [
  {
    "term": "Word",
    "translation": "Palabra",
    "definition": "Simple definition",
    "imageKeyword": "specific keyword for pexels"
  }
]
```

4. **Importar en `vocabularyService.ts`:**
```typescript
import newVocabulary from "../data/vocabulary/newFile.json";

const VOCABULARY_DATA = {
  ...baseVocabulary.vocabulary,
  ...intermediateVocabulary.vocabulary,
  ...newVocabulary.vocabulary, // Agregar aquí
};
```

---

## ✅ Ventajas del Nuevo Sistema

1. **Sin dependencia de IA**
   - No requiere API keys de Gemini
   - Funciona offline (solo imágenes requieren internet)
   - Costo $0 en generación de contenido

2. **Control Total**
   - Profesores pueden revisar y aprobar vocabulario
   - Contenido alineado 100% con currículum chileno
   - Calidad garantizada, no depende de IA

3. **Rendimiento**
   - Generación instantánea
   - No hay latencia de API
   - Mejor experiencia de usuario

4. **Mantenible**
   - Fácil agregar/modificar vocabulario
   - Versionado simple con Git
   - Colaboración entre profesores

---

## ⚠️ Limitaciones Actuales

1. **Vocabulario limitado**
   - Solo algunos temas tienen vocabulario completo
   - Necesita expansión gradual

2. **Temas personalizados**
   - Si un profesor ingresa un tema que no existe, la app mostrará error
   - Solución: Agregar más vocabulario o permitir creación manual

3. **Imágenes aún dependen de Pexels**
   - Requiere API key de Pexels
   - Requiere conexión a internet
   - Alternativa futura: Imágenes locales o CDN

---

## 📚 Recursos Útiles

- **Pexels API:** https://www.pexels.com/api/ (Gratuita, 200 req/hora)
- **Currículum Nacional Chile:** https://www.curriculumnacional.cl/
- **Estructura de datos:** Ver `data/vocabulary/base.json`

---

**Fin del Documento de Migración**

