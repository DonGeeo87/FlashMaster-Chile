# 🎓 FlashMaster Chile

![Status](https://img.shields.io/badge/Status-Activo-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vocabulario](https://img.shields.io/badge/Vocabulario-Predefinido-green)

**FlashMaster Chile** es una aplicación web diseñada específicamente para **profesores de inglés** en Chile. Utiliza vocabulario predefinido alineado con el Currículum Nacional (desde 1° Básico hasta 4° Medio) y la API de Pixabay para generar flashcards imprimibles de alta calidad con ilustraciones educativas.

---

## 🚀 Características Principales

### 1. Contexto Educativo Chileno 🇨🇱
- **Niveles Predefinidos:** Selección de cursos desde **1° Básico** hasta **4° Medio**.
- **Temáticas Sugeridas:** Al seleccionar un curso, la app sugiere temas pedagógicos acordes a la edad y nivel (ej. "Colors" para 1° Básico, "Debate language" para 1° Medio).
- **Personalización:** Opción para ingresar temáticas libres si el profesor lo requiere.

### 2. Vocabulario Predefinido y Curricular 📚
- **Contenido Validado:** Vocabulario cuidadosamente seleccionado y validado, alineado con el Currículum Nacional Chileno.
- **Sin Dependencia de IA:** Funciona completamente offline (excepto búsqueda de imágenes), garantizando privacidad y velocidad instantánea.
- **Palabras Clave Visuales:** Cada palabra incluye keywords específicas optimizadas para encontrar ilustraciones relevantes en Pixabay.

### 3. Ilustraciones Educativas (Pixabay API) 🎨
- **Ilustraciones para niños:** Integra la API de Pixabay para obtener dibujos e ilustraciones perfectas para el aula.
- **Contenido seguro:** Filtro SafeSearch y categoría educativa garantizan contenido apropiado.
- **Búsqueda Inteligente:** Selecciona aleatoriamente de un pool de ilustraciones para evitar repeticiones.
- **Regeneración Instantánea:** Si una ilustración no convence, pasa el mouse y haz clic en 🔄 para buscar una variante inmediatamente.

### 4. Enfoque en Profesores de Inglés 🇬🇧
- **Solo Inglés:** La aplicación está enfocada exclusivamente en enseñar inglés a estudiantes chilenos.
- **Toggle de Traducciones:** Opción para mostrar u ocultar las traducciones al español en las flashcards.
- **Material Listo para Imprimir:** Diseño optimizado para impresión en formato PDF.

### 5. Modo de Impresión Inteligente (PDF) 🖨️
La app cuenta con un motor de renderizado CSS específico para impresión (`@media print`):
- **Diseño de Cuadrícula:** Optimizado para papel tamaño Carta/A4 con guías de recorte.
- **Modo Juego (Imagen + Texto):** Si se selecciona este modo, el PDF separa el contenido:
  - **Página 1:** Solo Imágenes (sin texto).
  - **Página 2:** Solo Palabras (en grande).
  - *Objetivo:* Facilitar actividades de aula como "Memory", "Match the word", o pegar en la pizarra.
- **Modo Estudio:** Tarjetas tradicionales con la palabra y su traducción/definición juntas.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend Framework:** [React 19](https://react.dev/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para tipado estático robusto.
*   **Build Tool:** [Vite](https://vitejs.dev/) para desarrollo rápido y builds optimizados.
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para diseño responsivo y utilitario.
*   **Vocabulario:** Contenido predefinido en JSON, organizado por nivel y tema.
*   **Multimedia:** [Pixabay API](https://pixabay.com/api/docs/) para búsqueda de ilustraciones educativas.
*   **Iconografía:** SVG nativos y diseño limpio.

---

## 📋 Requisitos Previos

Para ejecutar este proyecto localmente, necesitas:

*   Node.js (v18 o superior)
*   NPM o Yarn
*   Una API Key de **Pixabay** (Gratuita, 5,000 requests/mes)

---

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/DonGeeo87/FlashMaster-Chile.git
    cd FlashMaster-Chile
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto:
    ```env
    PIXABAY_API_KEY=tu_api_key_de_pixabay
    ```
    
    **Obtener API Key:**
    - **Pixabay:** [https://pixabay.com/api/docs/](https://pixabay.com/api/docs/) (Gratuita, 5,000 requests/mes)
    1. Crea una cuenta en Pixabay
    2. Ve a tu perfil → API
    3. Copia tu API key

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Abrir en el navegador:**
    Visita `http://localhost:3000`

---

## 📖 Guía de Uso

1.  **Configuración:**
    - Selecciona el **Nivel** (ej. 1° Básico).
    - Elige la **Cantidad** de tarjetas (4, 8, 12, 16).
    - Selecciona el **Tema** sugerido o escribe uno propio.
    - Define el **Tipo de Tarjeta** (Imagen+Texto, Traducción, Definición).
    - Activa o desactiva **"Mostrar traducciones al español"** según prefieras.

2.  **Generación:**
    - Haz clic en "✨ Crear Flashcards".
    - Espera unos segundos mientras el sistema selecciona el vocabulario y busca las ilustraciones.

3.  **Revisión y Edición:**
    - Revisa las tarjetas generadas.
    - ¿Una imagen no corresponde? Pasa el cursor sobre la tarjeta y pulsa el icono de recargar 🔄.
    - ¿Tienes una mejor imagen? Usa el botón de subir imagen 📁.

4.  **Impresión:**
    - Haz clic en el botón **"Imprimir Set (PDF)"**.
    - Se abrirá el diálogo de impresión del navegador.
    - Asegúrate de activar "Gráficos de fondo" en las opciones de impresión para ver los colores correctamente.
    - ¡Guarda como PDF o imprime directamente!

---

## 📚 Vocabulario Disponible

### 1° Básico
- ✅ Colors
- ✅ Numbers 1–20
- ✅ Shapes
- ✅ Family members
- ✅ School objects
- ✅ Toys
- ✅ Clothes (básico)
- ✅ Weather simple
- ✅ Food (favorite foods)
- ✅ Animals (pets)
- ✅ Actions (run, jump, clap)
- ✅ Feelings (happy, sad, scared)

### 2° Básico
- ✅ Animals (wild vs. farm)
- ✅ Food 🥗 (frutas, vegetales, snacks)
- ✅ Daily routines (wake up, brush teeth, sleep)
- ✅ Jobs 👷‍♂️ (doctor, teacher, firefighter)
- ✅ Means of transport 🚗 (car, bus, bike)
- ✅ Places in town 🏙️ (school, park, hospital)
- ✅ House & rooms 🏠 (kitchen, bathroom, bedroom)
- ✅ Weather expanded ⛅
- ✅ Adjectives simple (big, small, fast, slow)

### 3°-8° Básico y 1°-4° Medio
- 📝 Temas definidos en `constants.ts`
- 🚧 Vocabulario en desarrollo (estructura lista)

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Especialmente:
- Sugerencias para mejorar el vocabulario por tema
- Añadir más niveles al currículum
- Mejorar las keywords de imágenes

1.  Haz un Fork del proyecto.
2.  Crea tu rama de funcionalidad (`git checkout -b feature/NuevaFuncionalidad`).
3.  Haz Commit de tus cambios (`git commit -m 'Agregado nueva funcionalidad'`).
4.  Haz Push a la rama (`git push origin feature/NuevaFuncionalidad`).
5.  Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🚀 Despliegue

Este proyecto puede desplegarse fácilmente en **Vercel** o **GitHub Pages** sin necesidad de backend o Firebase.

### Desplegar en Vercel

1. **Conecta tu repositorio** en [Vercel](https://vercel.com)
2. **Configura las variables de entorno:**
   - `PIXABAY_API_KEY`
3. **Despliega:** Vercel detectará automáticamente Vite y configurará el build

El archivo `vercel.json` ya está configurado para manejar las rutas de la SPA.

### Desplegar en GitHub Pages

1. **Habilita GitHub Pages** en la configuración del repositorio
   - Settings → Pages → Source: GitHub Actions
2. **Configura los secrets** en Settings → Secrets and variables → Actions:
   - `PIXABAY_API_KEY`
3. **Push a main/master:** El workflow `.github/workflows/deploy-gh-pages.yml` se ejecutará automáticamente
4. **Accede a tu sitio:** Tu app estará en: `https://tu-usuario.github.io/tu-repositorio/`

**Nota:** Si tu repositorio tiene un nombre diferente, actualiza el `base` en `vite.config.ts` para que coincida con el nombre del repositorio.

---

## 🐛 Solución de Problemas

### Las imágenes no aparecen
- Verifica que `PIXABAY_API_KEY` esté configurada en las variables de entorno
- Revisa la consola del navegador para errores de API
- Asegúrate de tener conexión a internet

### No se genera vocabulario para un tema
- Verifica que el tema seleccionado tenga vocabulario disponible en `data/vocabulary/`
- Algunos temas personalizados pueden no tener vocabulario aún
- Revisa los logs del navegador para ver el tema exacto que falló

### Error al construir el proyecto
- Asegúrate de tener Node.js v18 o superior
- Ejecuta `npm install` nuevamente
- Verifica que todas las dependencias estén instaladas

---

## 📝 Estructura del Proyecto

```
FlashMaster-Chile/
├── components/          # Componentes React
│   ├── ConfigForm.tsx   # Formulario de configuración
│   ├── FlashcardItem.tsx # Tarjeta individual
│   └── PrintLayout.tsx  # Layout de impresión
├── data/
│   └── vocabulary/      # Vocabulario predefinido (JSON)
│       ├── base.json    # 1°-2° Básico
│       └── intermediate.json # 3°-6° Básico
├── services/            # Servicios de API
│   ├── vocabularyService.ts # Generación de vocabulario
│   └── pixabayService.ts    # Búsqueda de ilustraciones
├── .github/
│   └── workflows/       # GitHub Actions para deploy
├── vite.config.ts       # Configuración de Vite
└── package.json         # Dependencias del proyecto
```

---

**Desarrollado con ❤️ para profesores de inglés en Chile.**  
**Desarrollador:** Giorgio Interdonato Palacios  
**GitHub:** [@DonGeeo87](https://github.com/DonGeeo87)
