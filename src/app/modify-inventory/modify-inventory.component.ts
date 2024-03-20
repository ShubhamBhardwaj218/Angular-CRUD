import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iinventory } from '../commomModels/commomModel';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-modify-inventory',
  standalone: true,
  imports: [
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modify-inventory.component.html',
  styleUrl: './modify-inventory.component.scss'
})
export class ModifyInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  inventory!: import("@angular/fire/compat/database").SnapshotAction<any>[];
  modifyItemkey: string = '';
  inventoryData: any;
  imageFile: any;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router) {
    this.inventoryForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.modifyItemkey = localStorage?.getItem('modifyItemkey') ?? '';
    console.log("this.modifyItemkey = ", this.modifyItemkey);
    localStorage.clear();

    this.populateForm();
  }

  populateForm() {
    this.inventoryService.getInventory(this.modifyItemkey).snapshotChanges().subscribe({
      next: (res) => {
        let inventory = res?.payload?.toJSON() as Iinventory;
        // this.inventoryForm?.setValue(inventory);
        this.inventoryForm?.setValue({
          title: inventory.title || '',
          price: inventory.price || '',
          image: inventory.imageUrl || '',
          description: inventory.description || '',
        });
      },
    });
  }


  onSubmit() {
    if (this.inventoryForm.valid) {
      const data = {
        "title": this.inventoryForm.value.title,
        "price": this.inventoryForm.value.price,
        "description": this.inventoryForm.value.description,
        "imageUrl": this.inventoryForm.value.image
      };

      if (this.modifyItemkey !== '') {
        this.inventoryService.updateInventory(this.modifyItemkey, data);
      } else {
        this.inventoryService.addInventory(data);
      }


      this.router.navigate(['dashboard']);
    } else {
      this.inventoryForm.markAllAsTouched();
    }
  }


  onFileSelected(event: any): void {

    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      event.target.value = null;
    }
  }
}


