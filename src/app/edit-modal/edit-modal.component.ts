import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../dtos';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Input() product: IProduct = {
    _id: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    cantidad: 0,
  };
  @Input() isModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() needsRefresh = new EventEmitter<boolean>();
  isEditing = false;

  constructor(private http: HttpService) {}

  onCloseModal(event: Event) {
    event.preventDefault();
    this.closeModal.emit(true);
  }
  onSubmit(productId: string, editedProduct: IProduct) {
    this.isEditing = true;
    this.http
      .updateProduct(productId, editedProduct)
      .then((res) => {
        this.needsRefresh.emit(true);
        this.closeModal.emit(true);
        this.isEditing = false;
      })
      .catch(alert);
  }
}
