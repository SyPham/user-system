import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { WorkerService } from 'src/app/_core/_service/worker.service';
import { UserSystemService } from 'src/app/_core/_service/user.system.service';
import { UserSystem } from 'src/app/_core/_model/user.system';
import { SystemCode } from 'src/app/_core/_model/system';

@Component({
  selector: 'app-user-system',
  templateUrl: './user-system.component.html',
  styleUrls: ['./user-system.component.css']
})
export class UserSystemComponent implements OnInit {
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search'];
  toolbarOptionsUser = ['ExcelExport', 'Search'];
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('gridSystem') gridSystem: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 15 };
  filterSettings = { type: 'Excel' };
  users: any;
  userID = 0;
  systems: Array<SystemCode> = [];
  userSystem: UserSystem = {
    userID: 0,
    systemID: 0
  };
  systemID: number;
  system: SystemCode = {
    id: 0,
    name: ''
  };
  focusIndex = 0;
  constructor(
    private userSystemService: UserSystemService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getAllSystem();
  }
  // api

  getAllUserBySystem() {
    this.userSystemService.getAllUserBySystem(this.systemID).subscribe(res => {
      this.users = res;
    });
  }
  getAllSystem() {
    this.userSystemService.getAllSystem().subscribe(res => {
      this.systems = res;
    });
  }
  dataBound() {
    this.gridSystem.selectRows([this.focusIndex]);
  }
  createSystem() {
    this.userSystemService.createSystem(this.system).subscribe(() => {
      this.alertify.success('Add System Successfully');
      this.getAllSystem();
    });
  }
  updateSystem() {
    this.userSystemService.updateSystem(this.system).subscribe(() => {
      this.alertify.success('Update System Successfully');
      this.getAllSystem();
    });
  }
  mapUserSystem() {
    this.userSystemService.mapUserSystem(this.userSystem).subscribe(() => {
      this.alertify.success('Update System Successfully');
      this.getAllUserBySystem();
    });
  }
  resetButton() {
  }

  deleteSystem(id) {
    this.alertify.confirm('Delete Update', 'Are you sure you want to delete this Update "' + id + '" ?', () => {
      this.userSystemService.deleteSystem(id).subscribe(() => {
        this.getAllSystem();
        this.alertify.success('The system has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the system');
      });
    });
  }
  // end api

  // grid event
  mapping(args, data) {
    this.userSystem.userID = data.ID;
    this.userSystem.systemID = this.systemID;
    if (this.systemID === 0) {
      this.alertify.warning('Please select a system to mapping!!!');
      this.grid.refresh();
      return;
    }
    this.mapUserSystem();
  }
  toolbarClick(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.gridSystem.excelExport();
        break;
      /* tslint:enable */
      default:
        break;
    }
  }
  toolbarClickUser(args): void {
    switch (args.item.text) {
      /* tslint:disable */
      case 'Excel Export':
        this.grid.excelExport();
        break;
      /* tslint:enable */
      default:
        break;
    }
  }
  rowSelected(args) {
    this.systemID = args.isInteracted === true ? args.data.ID : args.data[0]?.ID || 0;
    this.focusIndex = args.rowIndex;
    this.getAllUserBySystem();
  }
  actionBegin(args) {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.system.id = 0;
        this.system.name = args.data.Name;
        this.createSystem();
      }
      if (args.action === 'edit') {
        this.system.id = args.data.ID;
        this.system.name = args.data.Name;
        this.updateSystem();
      }
    }
    if (args.requestType === 'delete') {
      this.deleteSystem(args.data[0].ID);
    }
  }
  actionComplete(e: any): void {
    if (e.requestType === 'beginEdit') {
      (e.form.elements.namedItem('Name') as HTMLInputElement).focus();
    }
    if (e.requestType === 'add') {
      (e.form.elements.namedItem('Name') as HTMLInputElement).focus();
    }
  }
  // end event
  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.grid.pageSettings.pageSize + Number(index) + 1;
  }
}
