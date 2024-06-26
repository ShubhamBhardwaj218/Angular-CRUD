import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInventoryComponent } from './modify-inventory.component';

describe('ModifyInventoryComponent', () => {
  let component: ModifyInventoryComponent;
  let fixture: ComponentFixture<ModifyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
