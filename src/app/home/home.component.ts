import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class HomeComponent {
  code: string = '';
  isLoading: boolean = false;
  constructor(private dataService:DataService,private toastr:ToastrService) {}
  login() {
    if (this.code.trim() == '') {
      this.toastr.error('enter a code','error');
      return;
    }
    this.isLoading = true;
    this.dataService.processDataAndNavigate(this.code.trim()).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}