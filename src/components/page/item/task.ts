import { BaseComponent } from '../../component.js';

export class TaskComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, task: string) {
    super(`<section class="task">
            <h2 class="task__title"></h2>
            <input type="checkbox" class="task-checkbox">
          </section>`);

    const titleElement = this.element.querySelector(
      '.task__title'
    )! as HTMLHeadingElement;
    const taskElement = this.element.querySelector('.task-checkbox')! as HTMLInputElement;
    taskElement.insertAdjacentText('afterend', task);
    titleElement.textContent = title;
    taskElement.textContent = task;
  }
}
