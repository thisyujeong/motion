import { Component } from './components/component.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TaskComponent } from './components/page/item/task.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(image);

    const video = new VideoComponent(
      'Video Title',
      'https://www.youtube.com/embed/51zOBjDkJpo'
    );
    this.page.addChild(video);

    const note = new NoteComponent('Note Title', 'This section is Note Description');
    this.page.addChild(note);

    const task = new TaskComponent('Task Title', 'Task Item');
    this.page.addChild(task);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
