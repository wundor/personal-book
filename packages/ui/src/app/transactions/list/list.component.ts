import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { ITransaction } from '@pb/api/src/interfaces/transactions.interface';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Title } from '@angular/platform-browser';
import { PeriodService } from 'src/app/shared/period.service';

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
  expandSet = new Set<number>();

  toggleExpandAll(id: number): void {
    if (this.expandSet.has(id)) {
      this.expandSet.clear();
    } else {
      this.transactions.forEach((transaction) => {
        this.expandSet.add(transaction.id);
      });
    }
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

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

  constructor(
    private listService: TransactionsService,
    private title: Title,
    private period: PeriodService,
  ) {
    this.period.periodChanged$.subscribe((value) => {
      this.showTransactions();
    });
  }

  ngOnInit(): void {
    this.showTransactions();
    this.title.setTitle('Transactions');
  }
}
