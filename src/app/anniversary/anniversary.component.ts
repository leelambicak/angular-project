import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anniversary',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './anniversary.component.html',
  styleUrl: './anniversary.component.css'
})
export class AnniversaryComponent {
   @Input() data:any={};
   word:string='';

  
   ngDoCheck() {
    const years = this.data.years;
    if (years == 1||years == 21||years == 31||years==41) {
      this.word = 'st';
    } else if (years == 2||years == 22||years == 32||years==42) {
      this.word = 'nd';
    } else if (years == 3||years == 23||years == 33||years==43) {
      this.word = 'rd';
    } else {
      this.word = 'th';
    }
}


   }
   



  

