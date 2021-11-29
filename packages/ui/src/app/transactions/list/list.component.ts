import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { ITransaction } from '@pb/lib/src';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Title } from '@angular/platform-browser';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ITransaction> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-transactions-list',
  templateUrl: './list.component.html',
  providers: [TransactionsService],
  styleUrls: ['./list.component.less'],
})
export class TransactionsListComponent implements OnInit {
  transactions: ITransaction[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Date',
      sortOrder: 'descend',
      sortFn: (a: ITransaction, b: ITransaction) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      },
      sortDirections: ['ascend', 'descend'],
    },
  ];

  showTransactions() {
    this.listService.getTransactions().subscribe((data: ITransaction[]) => {
      this.transactions = data;
    });
  }

  constructor(private listService: TransactionsService, private title: Title) {}

  ngOnInit(): void {
    this.showTransactions();
    this.title.setTitle('Transactions');
  }
}
