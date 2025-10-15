import { Section as SectionPrisma } from '@prisma/client';
import { Seccion } from '../types/books';

export const toPrismaSection = (s: Seccion): SectionPrisma => ({
  'Filosofos de la antiguedad': 'Filosofos_de_la_antiguedad',
  'Renovadores del renacimiento': 'Renovadores_del_renacimiento',
  'Difusores contemporaneos': 'Difusores_contemporaneos',
  'Populares en la actualidad': 'Populares_de_la_actualidad',
} as const)[s];

export const toSeccionLabel = (s: SectionPrisma): Seccion => ({
  Filosofos_de_la_antiguedad: 'Filosofos de la antiguedad',
  Renovadores_del_renacimiento: 'Renovadores del renacimiento',
  Difusores_contemporaneos: 'Difusores contemporaneos',
  Populares_de_la_actualidad: 'Populares en la actualidad',
} as const)[s];
