import { Component, OnInit,OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit,OnChanges {
  @Input() rating:number=4;
  cropWidth:number=75;
  @Output() ratingClicked:EventEmitter<string> = new EventEmitter<string>()

  constructor() { }
  ngOnChanges(): void {
    this.cropWidth= this.rating *75/5
  }
  onRatingClick():void{
    this.ratingClicked.emit(`The rating ${this. rating} was clicked `)
    console.log(`The rating ${this. rating} was clicked `)
  }

  ngOnInit(): void {
  }

}
