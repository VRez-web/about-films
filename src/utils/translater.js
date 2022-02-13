export const translateDepartment = (department) => {
  switch (department) {
    case 'Directing':
      return 'Режиссура';
    case 'Production':
      return 'Продакшен';
    case 'Writing':
      return 'Сценарий';
    case 'Creator':
      return 'Создатель';
    default:
      return department;
  }
};

export const translateJob = (job) => {
  switch (job) {
    case 'Creator':
      return 'Создатель';
    case 'Writer':
      return 'Сценарист';
    case 'Executive Producer' :
      return 'Исполнительный продюсер';
    case 'Producer':
      return 'Продюсер';
    case'Co-Producer':
      return 'Сопродюсер';
    case 'Director':
      return 'Режиссёр-постановщик';
    default:
      return job;
  }
};
