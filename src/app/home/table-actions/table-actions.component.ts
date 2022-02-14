import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateSourceService } from 'src/app/services/http-service';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  providers: [DateSourceService]
})
export class TableActionsComponent implements OnInit {
  @Output() sendDataToTable = new EventEmitter;
  @Output() setEditedItemForTable = new EventEmitter;
  @Input() editMode = false;
  @Input() itemToEdit:any;
  addForm!: FormGroup;
  showError: boolean = false;
  loading: boolean = false;
  enableState: boolean = false;
  Id!: string
  constructor(
    private dateSourceService: DateSourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForms()
  }

  initForms() {
    this.addForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      method: new FormControl('', [Validators.required]),
      route: new FormControl('', [Validators.required]),
    })
    if(this.editMode) {
      // set values on editMode
      this.addForm.setValue({
        description: this.itemToEdit.Description,
        method: this.itemToEdit.Method,
        route: this.itemToEdit.Route,
      })

      this.enableState = this.itemToEdit.IsEnabled
      this.Id = this.itemToEdit.Id
    }
  }
 
  turnToEditMode() {
    this.editMode != this.editMode
  }

  addNewItem() {
    if (this.addForm.invalid) {
      this.showError = true;
      return;
    } else {
      let data: any = {
        Description: this.addForm.get('description')?.value,
        Method: this.addForm.get('method')?.value,
        Route: this.addForm.get('route')?.value
      }
      if(this.editMode) {
        data.Id = this.Id
        data.IsEnabled = this.enableState
        this.editItem(data)
      }
      else {
        this.addItem(data)
      }
    
    }
  }
  editItem(data: any) {
    this.loading = true
    this.dateSourceService.edit(data).then(
      res => {
        this.setEditedItemInTable(data);
        this.editMode = false;
        this.initForms()
        this.toastrService.success('data successfully edited')
      },
      err => {
        this.toastrService.error('item did not edited')
      },
    ).finally(() => {
      this.loading = false
    })
  }

  addItem(data: any) {
    this.loading = true
    this.dateSourceService.addNew(data).then(
      res => {
        this.toastrService.success('item successfully added to table');
        this.addNewItemToTable(data);
        this.initForms()
      },
      err => {
        this.toastrService.error('item did not added to the table')
      }
    ).finally(() => {
      this.loading = false;
    })
  }
  
  addNewItemToTable(data: any) {
    this.sendDataToTable.emit(data)
  }
  setEditedItemInTable(data: any) {
    this.setEditedItemForTable.emit(data)
  }
}
