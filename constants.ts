import { GradeLevel } from './types';

export const SUGGESTED_TOPICS: Record<string, string[]> = {
  [GradeLevel.BASICO_1]: ['Colores (Colors)', 'Números 1-20', 'Familia (Family)', 'Partes del cuerpo', 'Saludos'],
  [GradeLevel.BASICO_2]: ['Animales de granja', 'Ropa (Clothes)', 'Frutas y Verduras', 'La Casa', 'Juguetes'],
  [GradeLevel.BASICO_3]: ['La Escuela', 'Profesiones', 'Días de la semana', 'Meses del año', 'El Clima'],
  [GradeLevel.BASICO_4]: ['Animales salvajes', 'La Hora', 'Deportes', 'Comida rápida', 'Verbos de acción'],
  [GradeLevel.BASICO_5]: ['Rutina diaria', 'Lugares en la ciudad', 'Adjetivos comparativos', 'Instrumentos musicales'],
  [GradeLevel.BASICO_6]: ['Tecnología', 'Medios de transporte', 'Pasado simple', 'Países y nacionalidades'],
  [GradeLevel.BASICO_7]: ['Sentimientos y emociones', 'Salud y enfermedades', 'Medio ambiente', 'Hobbies'],
  [GradeLevel.BASICO_8]: ['Biografías', 'Viajes', 'Futuro', 'Cultura pop'],
  [GradeLevel.MEDIO_1]: ['Redes sociales', 'Mundo laboral', 'Derechos humanos', 'Amistad'],
  [GradeLevel.MEDIO_2]: ['Globalización', 'Ciencia y Tecnología', 'Sustentabilidad', 'Arte y Literatura'],
  [GradeLevel.MEDIO_3]: ['Debate y argumentación', 'Ciudadanía global', 'Innovación', 'Salud mental'],
  [GradeLevel.MEDIO_4]: ['Proyecto de vida', 'Economía actual', 'Desafíos globales', 'Inglés académico'],
};

export const DEFAULT_PLACEHOLDER_IMG = "https://picsum.photos/400/400?grayscale";
