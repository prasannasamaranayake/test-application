import {MatTableDataSource} from "@angular/material/table";

export class TableView<T> {
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<T>;

  constructor(columns: Array<string>) {
    this.displayedColumns = columns;
    this.dataSource = new MatTableDataSource<T>([]);
  }

}
