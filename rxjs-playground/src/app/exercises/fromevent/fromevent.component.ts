import { Component } from '@angular/core';
import { fromEvent, map, startWith, debounceTime, distinct } from 'rxjs';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './fromevent.component.html',
})
export class FromeventComponent {

  currentWidth = 0;

  constructor() {

    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    fromEvent(window, 'resize').pipe(

      map(x => (x.target as Window).innerWidth),
      debounceTime(1000),
      startWith(window.innerWidth),
      distinct(),

    ).subscribe(width => this.currentWidth = width)


    /******************************/
  }

}
