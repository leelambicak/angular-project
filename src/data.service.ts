import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer, of } from 'rxjs';
import {catchError, switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from './environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private router: Router,private toastr:ToastrService) {}
  getData(code: string): Observable<any> {
     return this.http.get<any>(`${environment.baseUrl}?secret=${code}`).pipe(
      // return this.http.get<any>('/assets/images/data.json').pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  processDataAndNavigate(key: string): Observable<any> {
    return new Observable(observer => {
      this.getData(key).subscribe({
        next: () => {
          localStorage.setItem('code', key);
          this.router.navigate(['/display']);
          observer.next(true);
          observer.complete();
        },
        error: (error: any) => {
          this.toastr.error('url not working');
          this.router.navigate(['/']);
          observer.error(error);
        }
      });
    });
  }
  fetchDataPeriodically(): Observable<any> {
    return timer(0, 3600000).pipe(

      switchMap(() => {

        const storedCode = localStorage.getItem('code');
        if (storedCode) {
          return this.getData(storedCode).pipe(
            map(data => this.filterValidItems(data))

          );
        }
        return of(null);
      })
    );
  }
  filterValidItems(items: any[]): any[] {
    const now = new Date();
    return items.filter(item => {
      const startDate = new Date(item.start_time);
      const endDate = new Date(item.end_time);
      return (now >= startDate && now <= endDate);

    });
  }
}
