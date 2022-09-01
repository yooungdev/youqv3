"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.level = exports.classesOptionsObject = exports.classesOptions = exports.itemsOptionsObject = exports.itemsOptions = void 0;
// options
exports.itemsOptions = [
    { value: 'all', label: 'Все' },
    { value: 'mathematics', label: 'Математика' },
    { value: 'literature', label: 'Литература' },
    { value: 'algebra', label: 'Алгебра' },
    { value: 'russian', label: 'Русский язык' },
    { value: 'geometry', label: 'Геометрия' },
    { value: 'english', label: 'Английский язык' },
    { value: 'chemistry', label: 'Химия' },
    { value: 'physics', label: 'Физика' },
    { value: 'biology', label: 'Биология' },
    { value: 'history', label: 'История' },
    { value: 'social_studies', label: 'Обществознание' },
    { value: 'surrounding_world', label: 'Окружающий мир' },
    { value: 'geography', label: 'География' },
    { value: 'informatics', label: 'Информатика' },
    { value: 'economy', label: 'Экономика' },
    { value: 'music', label: 'Музыка' },
    { value: 'right', label: 'Право' },
    { value: 'french', label: 'Французский язык' },
    { value: 'obzh', label: 'Обж' },
    { value: 'psychology', label: 'Психология' },
    { value: 'astronomy', label: 'Астрономия' },
    { value: 'physical_culture', label: 'Физкультура и спорт' }
];
exports.itemsOptionsObject = {
    all: 'Все',
    mathematics: 'Математика',
    literature: 'Литература',
    algebra: 'Алгебра',
    russian: 'Русский язык',
    geometry: 'Геометрия',
    english: 'Английский язык',
    chemistry: 'Химия',
    physics: 'Физика',
    biology: 'Биология',
    history: 'История',
    social_studies: 'Обществознание',
    surrounding_world: 'Окружающий мир',
    geography: 'География',
    informatics: 'Информатика',
    economy: 'Экономика',
    music: 'Музыка',
    right: 'Право',
    french: 'Французский язык',
    obzh: 'Обж',
    psychology: 'Психология',
    astronomy: 'Астрономия',
    physical_culture: 'Физкультура и спорт'
};
exports.classesOptions = [
    { value: 'all', label: 'Все класс' },
    { value: 'junior', label: '1 - 4 классы' },
    { value: 'middle', label: '5 - 9 классы' },
    { value: 'senior', label: '9 - 11 классы' },
    { value: 'college', label: 'Студенческий' }
];
exports.classesOptionsObject = {
    all: 'Все класс',
    junior: '1 - 4 классы',
    middle: '5 - 9 классы',
    senior: '9 - 11 классы',
    college: 'Студенческий'
};
// level    
exports.level = {
    beginner: 'Новичок'
};
// role 
exports.role = {
    student: 'Ученик',
    teacher: 'Учитель',
    parent: 'Родитель',
    other: 'Другое'
};
