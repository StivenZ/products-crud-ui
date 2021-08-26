import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../dtos';

const ENDPOINTS = {
  get: 'products',
  create: 'products',
  delete: 'products',
  update: 'products',
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string =
    'https://8ojxj4mypc.execute-api.sa-east-1.amazonaws.com/dev/';

  constructor(private http: HttpClient) {}

  getProducts(): Promise<Array<any>> {
    return this.http
      .get<Array<any>>(`${this.baseUrl}${ENDPOINTS.get}`)
      .toPromise();
  }
  createProduct(product: IProduct) {
    return this.http
      .post(`${this.baseUrl}${ENDPOINTS.create}`, product)
      .toPromise();
  }
  updateProduct(id: string, editedProduct: IProduct) {
    return this.http
      .put(`${this.baseUrl}${ENDPOINTS.update}/${id}`, editedProduct)
      .toPromise();
  }
  deleteProduct(id: string) {
    return this.http
      .delete(`${this.baseUrl}${ENDPOINTS.delete}/${id}`)
      .toPromise();
  }
}
