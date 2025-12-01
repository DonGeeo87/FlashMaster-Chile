# 🎓 FlashMaster Chile

![Status](https://img.shields.io/badge/Status-Activo-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![AI](https://img.shields.io/badge/AI-Gemini%202.5-orange)

**FlashMaster Chile** es una aplicación web progresiva diseñada específicamente para profesores de inglés y español en Chile. Utiliza Inteligencia Artificial (Google Gemini) y servicios de fotografía de stock (Pexels) para generar material didáctico imprimible de alta calidad, alineado con el Currículum Nacional (desde 1° Básico hasta 4° Medio).

---

## 🚀 Características Principales

### 1. Contexto Educativo Chileno 🇨🇱
- **Niveles Predefinidos:** Selección de cursos desde **1° Básico** hasta **4° Medio**.
- **Temáticas Sugeridas:** Al seleccionar un curso, la app sugiere temas pedagógicos acordes a la edad y nivel (ej. "Colores" para 1° Básico, "Debate y Argumentación" para 3° Medio).
- **Personalización:** Opción para ingresar temáticas libres si el profesor lo requiere.

### 2. Potencia de Inteligencia Artificial (Gemini 2.5 Flash) 🤖
- **Generación de Vocabulario:** Crea listas de palabras pedagógicamente relevantes para el nivel seleccionado.
- **Ingeniería de Prompts Avanzada:** El sistema no solo traduce, sino que deduce "palabras clave visuales" (Visual Keywords) para encontrar imágenes concretas y no conceptos abstractos (ej. para "Rápido", busca "Guepardo corriendo").

### 3. Imágenes Reales y de Alta Calidad (Pexels API) 📸
- **No más dibujos genéricos:** Integra la API de Pexels para obtener fotografías reales, ideales para la enseñanza de vocabulario concreto.
- **Búsqueda Inteligente:** Selecciona aleatoriamente de un "pool" de imágenes para evitar repeticiones.
- **Regeneración Instantánea:** Si una foto no convence al profesor, puede pasar el mouse y hacer clic en 🔄 para buscar una variante inmediatamente.

### 4. Modo de Impresión Inteligente (PDF) 🖨️
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
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para diseño responsivo y utilitario.
*   **Generative AI:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (Modelo `gemini-2.5-flash`).
*   **Multimedia:** [Pexels API](https://www.pexels.com/api/) para búsqueda de fotos.
*   **Iconografía:** SVG nativos y diseño limpio.

---

## 📋 Requisitos Previos

Para ejecutar este proyecto localmente, necesitas:

*   Node.js (v18 o superior)
*   NPM o Yarn
*   Una API Key de **Google Gemini** (AI Studio).
*   Una API Key de **Pexels** (Gratuita).

---

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/flashmaster-chile.git
    cd flashmaster-chile
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto (o configura tus variables en tu entorno de despliegue):
    ```env
    REACT_APP_GEMINI_API_KEY=tu_api_key_de_google
    # Nota: La API de Pexels está configurada en services/geminiService.ts
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm start
    # O si usas Vite
    npm run dev
    ```

5.  **Abrir en el navegador:**
    Visita `http://localhost:3000` (o el puerto que indique tu consola).

---

## 📖 Guía de Uso

1.  **Configuración:**
    - Selecciona el **Nivel** (ej. 2° Básico).
    - Elige la **Cantidad** de tarjetas (4, 8, 12, 16).
    - Selecciona el **Tema** sugerido o escribe uno propio.
    - Define el **Tipo de Tarjeta** (Imagen+Texto, Traducción, Definición).

2.  **Generación:**
    - Haz clic en "✨ Crear Flashcards".
    - Espera unos segundos mientras la IA define el vocabulario y busca las fotos.

3.  **Revisión y Edición:**
    - Revisa las tarjetas generadas.
    - ¿Una imagen no corresponde? Pasa el cursor sobre la tarjeta y pulsa el icono de recargar 🔄.
    - ¿Tienes una mejor foto en tu PC? Usa el botón de subir imagen 📁.

4.  **Impresión:**
    - Haz clic en el botón negro **"Imprimir Set (PDF)"**.
    - Se abrirá el diálogo de impresión del navegador.
    - Asegúrate de activar "Gráficos de fondo" en las opciones de impresión para ver los colores correctamente.
    - ¡Guarda como PDF o imprime directamente!

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Especialmente sugerencias para mejorar los "prompts" pedagógicos o añadir más niveles al currículum.

1.  Haz un Fork del proyecto.
2.  Crea tu rama de funcionalidad (`git checkout -b feature/NuevaFuncionalidad`).
3.  Haz Commit de tus cambios (`git commit -m 'Agregado nueva funcionalidad'`).
4.  Haz Push a la rama (`git push origin feature/NuevaFuncionalidad`).
5.  Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ para la educación en Chile.**
