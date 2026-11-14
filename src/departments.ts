// Соответствие значения поля department из API и названия вкладки
export const DEPARTMENTS: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  design: 'Дизайн',
  management: 'Менеджмент',
  qa: 'QA',
  back_office: 'Бэк-офис',
  frontend: 'Frontend',
  hr: 'HR',
  pr: 'PR',
  backend: 'Backend',
  support: 'Техподдержка',
  analytics: 'Аналитика',
}

// Если пришёл неизвестный департамент, показываем его как есть
export function departmentLabel(key: string): string {
  return DEPARTMENTS[key] ?? key
}
