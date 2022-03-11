import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  // https://stackoverflow.com/questions/37450805/what-is-the-read-parameter-in-viewchild-for
  @ViewChild('contextMenu', { read: MatMenuTrigger }) contextMenuTrigger!: MatMenuTrigger;

  contextMenuPosition = { left: 300, top: 300 };

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.left = event.x;
    this.contextMenuPosition.top = event.y;
    this.contextMenuTrigger.openMenu();
  }
}
