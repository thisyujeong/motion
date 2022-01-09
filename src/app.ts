import { Component } from './components/component.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectioniinput } from './components/dialog/input/media-input.js';
import { TextSectioniinput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TaskComponent } from './components/page/item/task.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    /* image */
    this.bindElementToDialog<MediaSectioniinput>(
      '#new-image',
      MediaSectioniinput,
      (input: MediaSectioniinput) => new ImageComponent(input.title, input.url)
    );

    /* video */
    this.bindElementToDialog<MediaSectioniinput>(
      '#new-video',
      MediaSectioniinput,
      (input: MediaSectioniinput) => new VideoComponent(input.title, input.url)
    );

    /* note */
    this.bindElementToDialog<TextSectioniinput>(
      '#new-note',
      TextSectioniinput,
      (input: TextSectioniinput) => new NoteComponent(input.title, input.body)
    );

    /* task */
    this.bindElementToDialog<TextSectioniinput>(
      '#new-task',
      TextSectioniinput,
      (input: TextSectioniinput) => new TaskComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot); // 섹션을 만들어서 페이지에 추가한다.
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
