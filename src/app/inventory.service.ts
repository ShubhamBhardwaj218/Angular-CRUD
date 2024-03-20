import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Iinventory } from './commomModels/commomModel';
import { getDatabase } from 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private dbAddress = '/products';
  private db = getDatabase();
  inventoryRef!: AngularFireList<any>;

  constructor(private inventoryDB: AngularFireDatabase) {
    this.inventoryRef = inventoryDB.list(this.dbAddress);
  }

  getAllInventory() {
    return this.inventoryRef;
  }

  getInventory(key: string) {
    return this.inventoryDB.object(`${this.dbAddress}/${key}`);
  }

  addInventory(inventory: Iinventory) {
    this.inventoryRef.push(inventory);
  }

  updateInventory(key: string, expense: Iinventory) {
    this.inventoryRef.update(key, expense);
  }

  deleteInventory(key: string) {
    this.inventoryRef.remove(key);
  }

}
