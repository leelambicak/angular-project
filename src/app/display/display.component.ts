
import { Component, Type, ViewChild, ViewContainerRef, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { BirthdayComponent } from '../birthday/birthday.component';
import { AnniversaryComponent } from '../anniversary/anniversary.component';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { MainComponent } from '../../main/main.component';
import { catchError } from 'rxjs/operators';
import { BelatedBirthdayComponent } from '../belated-birthday/belated-birthday.component';
import { BelatedAnniversaryComponent } from '../belated-anniversary/belated-anniversary.component';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  items: any[] = [];
  subscription!: Subscription;
  intervalId: any;
  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {
    const storedCode = localStorage.getItem('code');
    if (!storedCode) {
      this.router.navigate(['/']);
      return;
    }
    this.subscription = this.dataService.fetchDataPeriodically().pipe(
      catchError((error) => {
        console.error('Failed to fetch data', error);
        localStorage.removeItem('code');
        this.router.navigate(['/']);
        throw error;
      })
    ).subscribe((data: any) => {
      console.log('Fetched data:', data); 
      if (data) {
        this.items = data;
        this.displayMainComponent();
      }
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
  displayMainComponent() {
    this.container.clear();
    const mainComponentRef = this.container.createComponent(MainComponent);
    console.log('Displayed MainComponent:', mainComponentRef);
   
    setTimeout(() => {
      this.displayComponents();
    }, environment.defaultWaitTime * 1000); 
  }
  displayComponents() {
    if (this.items.length > 0) {
      this.displayNextComponent(0);
    }
  }
  displayNextComponent(index: number) {
    if (index >= this.items.length) {
     
      this.displayMainComponent();
      return;
    }
    const item = this.items[index];
    const componentType = this.getComponentType(item);
    if (componentType) {
      this.container.clear();
      const componentRef = this.container.createComponent(componentType);
      console.log('Created component:', componentType, 'with data:', item); 
      componentRef.instance.data = item;
   
      this.intervalId = setTimeout(() => this.displayNextComponent(index + 1), (item.duration || environment.defaultWaitTime) * 1000);
    } else {
      console.warn('Unknown component type for category:', item.category);

      this.displayNextComponent(index + 1);
    }
  }
  getComponentType(item:any): Type<any> | null {
    switch (item.category) {
      case 'birthday': {
        if(item.belated=='yes')
        {
          return BelatedBirthdayComponent
        }
        else{
          return BirthdayComponent
        }
      };
      case 'anniversary':{
        if(item.belated =='yes'){
          return BelatedAnniversaryComponent
        }
        else{
        return AnniversaryComponent}
      };
      case 'announcement': return AnnouncementComponent;
      case 'welcome': return WelcomeComponent;
      default: return null;
    }
  }
}






















