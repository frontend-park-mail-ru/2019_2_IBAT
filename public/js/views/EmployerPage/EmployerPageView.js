import template from './employerPage.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';

const test = [
  {"id":"dbbf4066-fef8-40d2-9bd4-248af9ac0563","owner_id":"2771edbb-8e4c-4d4d-80c6-29df9f9b9d0d","region":"Москва","company_name":"Mail.ru","experience":"Более 6 лет","position":"backend developer","tasks":"write backend","requirements":"Go","wage_from":"80 000.00 руб","type_of_employment":"Полная занятость","work_schedule":"Полный день","wage_to":"120 000.00 руб","conditions":"nice office, good team","favorite":false,"is_responded":false,"about":"the best IT company","spheres":null},
  {"id":"a1c70afa-c1d2-4162-bd78-73f6e9e47f4a","owner_id":"2771edbb-8e4c-4d4d-80c6-29df9f9b9d0d","region":"Москва","company_name":"Mail.ru","experience":"Более 6 лет","position":"Back-end (PHP) разработчик Senior","tasks":"Проектировать и разрабатывать архитектуру продуктов компании в составе команды разработчиков;\nИнтеграция с внешними сервисами (API);\nАнализировать и оптимизировать существующий кода.","requirements":"Знание принципов Solid;\nОтличное знание и применение ООП\nСтек: PHP 5.6, 7 (Symfony 2.8, 4.2); PostgreSQL, RabbitMQ, Doctrine, Redis, Git\nОпыт работы с Git (сами работаем с GitLab)\nУмение разбираться с чужим кодом и быстро включаться в процесс;\nРабота исключительно в офисе","wage_from":"200 000.00 руб","type_of_employment":"Полная занятость","work_schedule":"Удаленная работа","wage_to":"0.00 руб","conditions":"Достойную \"белую\" заработную плату по результатам собеседования;\nРаботу в компании с вменяемым руководством и адекватным отношением к сотрудникам;\nинтересные задачи и очень большой проект с продвинутыми технологиями;\nПосещение профильных конференций и курсов за счет компании;\nУдобный график работы 5/2 время начала рабочего дня обсуждаемо","favorite":false,"is_responded":false,"about":"По успешному завершению проектов выплачиваются бонусы;\nПицца-дни. Яркие масштабные корпоративы и спортивные мероприятия / молчание, \nпонимание и пледы для талантливых интровертов :).","spheres":null},
  {"id":"f3963590-2aac-4d58-8a45-9cc67dfecf53","owner_id":"1456c8b0-84e8-4902-86c6-d26ae71d5345","region":"Москва","company_name":"Yandex","experience":"От 3 до 6 лет","position":"backend developer","tasks":"write backend","requirements":"Go","wage_from":"125 000.00 руб","type_of_employment":"Полная занятость","work_schedule":"Удаленная работа","wage_to":"250 000.00 руб","conditions":"nice office, good team","favorite":false,"is_responded":false,"about":"top 2 IT company","spheres":null},
  {"id":"0d61ceb8-cfd0-4622-9ef2-b52257df16e7","owner_id":"1456c8b0-84e8-4902-86c6-d26ae71d5345","region":"Москва","company_name":"Yandex","experience":"Более 6 лет","position":"data scientist","tasks":"write II","requirements":"Python, math","wage_from":"150 000.00 руб","type_of_employment":"Полная занятость","work_schedule":"Удаленная работа","wage_to":"300 000.00 руб","conditions":"nice office, good team","favorite":false,"is_responded":false,"about":"top 2 IT company","spheres":null},
  {"id":"a5e8717d-1fbd-42c3-bc45-641899021b53","owner_id":"1456c8b0-84e8-4902-86c6-d26ae71d5345","region":"Москва","company_name":"Yandex","experience":"Более 6 лет","position":"Frontend-разработчик","tasks":"· Программирование Web-интерфейсов с использованием указанных технологий,\\n\n· Участие в обсуждении требований к разрабатываемым системам","requirements":"· Уровень Middle;\n· Отличные знания JS, HTML и CSS;\n· Знание jQuery, ES, sass или less;\n· Опыт использования систем сборки;\n· Опыт использования любой из системы контроля версий;\n· Инициативность, тяга к знаниям и ответственность;\n· Умения писать качественный поддерживаемый код;\n· Опыт работы в команде;","wage_from":"150 000.00 руб","type_of_employment":"Полная занятость","work_schedule":"Удаленная работа","wage_to":"300 000.00 руб","conditions":"· Работа в SCRUM команде над интересными и сложными задачами;\n· Официальное оформление в полном соответствии с Трудовым Кодексом РФ;\n· Удобный офис с отличным видом на Шлюзовую набережную и в шаговой доступности от м. Павелецкая;\n· Гибкое начало и окончание рабочего дня;\n· Заработная плата обсуждается индивидуально на собеседовании;\n· Участие в конференциях и курсы повышения квалификации;\n· Возможность бесплатно посещать развлекательные мероприятия;\n·Собеседование проводится очно в офисе в Москве.","favorite":false,"is_responded":false,"about":"top 2 IT company","spheres":null}
]
export class EmployerPageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
    this._vacancies = test;
  }

  render (data = {}) {
    super.render(data);

    const list = document.querySelector('.list');

      test.forEach(vacancy => {
        new ShortVacancyComponent({vacancy: vacancy, globalEventBus: this._globalEventBus}).appendTo(list);
      });
  }
}
