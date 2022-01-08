export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}
/**
 * base component:
 * Encapsulate the HTML element creation
 * HTML 엘리먼트를 만드는 것을 캡슐화
 */
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
