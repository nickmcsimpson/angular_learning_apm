import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  listFilter: string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  // Could us a setter to capture changes to input variables, but we will use a lifecycle method
  hitMessage: string;

  @ViewChild('filteredElement') filteredElementRef: ElementRef; // # in template reference variable

  constructor() { }

  ngOnInit(): void {
  }

  /*
      Using 'native element' is referencing DOM elements directly coupling the logic to the browser
      May want to surround in a check for this 'native element'
     */
  ngAfterViewInit(): void {
    this.filteredElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hitCount && !changes.hitCount.currentValue) {
      this.hitMessage = 'No Matches Found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

}
