export const translateDepartment = (department) => {
    switch (department) {
        case 'Directing':
            return 'Режиссура'
        case 'Production':
            return 'Продакшен'
        case 'Writing':
            return 'Сценарий'
        case 'Creator':
            return 'Создатель'
        default:
            return department
    }
}
