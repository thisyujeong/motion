import { BaseComponent } from '../../component.js';

export class TaskComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, task: string) {
    super(`<section class="task">
            <h2 class="page-item__title task__title"></h2>
            <input type="checkbox" class="task-checkbox">
            <label for="task-checkbox" class="task-label"></label>
          </section>`);

    const titleElement = this.element.querySelector(
      '.task__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const taskElement = this.element.querySelector('.task-label')! as HTMLInputElement;
    taskElement.textContent = task;
  }
}
