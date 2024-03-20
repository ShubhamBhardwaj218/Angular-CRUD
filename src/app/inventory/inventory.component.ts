import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iinventory } from '../commomModels/commomModel';
import { InventoryService } from '../inventory.service';

// import { environment } from '../../environments/environment';
import { ModifyInventoryComponent } from '../modify-inventory/modify-inventory.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    // AngularFireModule.initializeApp(environment.firebaseConfig) as any,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule,
    ModifyInventoryComponent,
    CommonModule
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  inventories: Iinventory[] = [];
  totalInventory: number = 0;

  constructor(private router: Router,
    private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.getInventory();
  }

  navigateToModify(key: any) {
  this.router.navigate(['modify']);
  localStorage.setItem('modifyItemkey', key);
}


getInventory() {
 this.inventoryService.getAllInventory().snapshotChanges().subscribe({
    next: (res) => {
      this.inventories = [];
      res.forEach(item => {
        let inventory = item.payload.toJSON() as Iinventory;
        this.totalInventory += parseInt(inventory.price);

        this.inventories.push({
          key: item.key || '',
          title: inventory.title,
          price: inventory.price,
          description: inventory.description,
          imageUrl: inventory.imageUrl
        })
      })
    }
  })
}

deleteInventory(e: any) {

  console.log(e, "e");
  this.inventoryService.deleteInventory(e);

  // this.getInventory();
}
}
