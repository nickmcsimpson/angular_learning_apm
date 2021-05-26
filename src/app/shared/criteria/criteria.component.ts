import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  // listFilter: string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  // Could us a setter to capture changes to input variables, but we will use a lifecycle method
  hitMessage: string;

  @Output() valueChanged = new EventEmitter<string>();

  @ViewChild('filteredElement') filteredElementRef: ElementRef; // # in template reference variable

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChanged.emit(value);
  }
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
