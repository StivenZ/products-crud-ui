import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  constructor(private http: HttpService) {}
  @Output() needsRefresh = new EventEmitter<boolean>();
  @Output() loadingData = new EventEmitter<boolean>();

  ngOnInit(): void {}

  onSubmit(data: any) {
    this.loadingData.emit(true);
    this.http
      .createProduct(data)
      .then((res) => {
        this.needsRefresh.emit(true);
      })
      .catch((err) => {
        console.error(err);
        alert('Sorry, something went wrong :(');
      });
  }
}
