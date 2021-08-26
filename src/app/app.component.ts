import { Component, OnInit } from '@angular/core';
import { IProduct } from './dtos';
import { HttpService } from './services/http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-app-test';
  products: IProduct[] = [];
  refreshProducts$ = new BehaviorSubject<boolean>(true);
  isLoading: boolean = true;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getProducts();
  }
  refreshProductList(event: boolean) {
    this.getProducts();
  }
  getProducts() {
    this.http
      .getProducts()
      .then((res) => {
        this.isLoading = false;
        this.products = res.reverse();
      })
      .catch((err) => alert('Sorry, something went wrong :('));
  }
  setLoadingSpinner(event: boolean) {
    this.isLoading = true;
  }
}
