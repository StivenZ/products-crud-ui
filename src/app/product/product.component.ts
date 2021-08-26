import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../dtos';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productObject: IProduct;
  @Output() needsRefresh = new EventEmitter<boolean>();
  isModalOpen: boolean = false;
  isDeleted = false;

  constructor(private http: HttpService) {
    this.productObject = {
      _id: '',
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: 0,
      cantidad: 0,
    };
  }
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  refreshList() {
    console.log('needsRefresh');
    this.needsRefresh.emit(true);
  }
  deleteProduct(productId: string) {
    this.isDeleted = true;
    this.http.deleteProduct(productId).then((res) => {
      this.needsRefresh.emit(true);
    });
  }
  ngOnInit(): void {}
}
