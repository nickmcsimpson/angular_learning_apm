import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'


@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    // Input parameters must use this decorator
    @Input() rating: number;
    // rating: number = 4;
    starWidth: number;
    // Event Emitter:
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    // Never fires because the value is not changed (initially)
    ngOnChanges(): void {
        this.starWidth = this.rating * 75/5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}