import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-belated-birthday',
  standalone: true,
  imports: [],
  templateUrl: './belated-birthday.component.html',
  styleUrl: './belated-birthday.component.css'
})
export class BelatedBirthdayComponent {
  @Input() data:any;


}
