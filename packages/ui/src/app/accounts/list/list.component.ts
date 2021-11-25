import { Component, OnInit } from '@angular/core';
import { Account } from '../accounts.interface';
import { ListService } from '../accounts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [ListService],
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService) {}

  accounts: Account[] = [];

  showAccounts() {
    this.listService.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
    });
  }

  ngOnInit(): void {
    this.showAccounts();
  }
}
