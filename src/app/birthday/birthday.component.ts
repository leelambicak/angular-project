import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-birthday',
  standalone: true,
  imports: [],
  templateUrl: './birthday.component.html',
  styleUrl: './birthday.component.css'
})
export class BirthdayComponent {
   @Input() data:any;


}
