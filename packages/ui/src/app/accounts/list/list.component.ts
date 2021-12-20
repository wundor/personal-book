import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import {
  IAccountGetLong,
  IAccountGetShort,
} from '@pb/api/src/interfaces/accounts.interface';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Title } from '@angular/platform-browser';

export type TreeNodeInterface = IAccountGetLong & {
  level?: number;
  parent?: TreeNodeInterface;
  expand?: boolean;
};

@Component({
  selector: 'app-accounts-list',
  templateUrl: './list.component.html',
  providers: [AccountsService, ApiService],
  styleUrls: ['./list.component.less'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccountGetLong[] = [];
  accountTree: TreeNodeInterface[] = [];

  showAccountTree() {
    this.accountsService
      .getAccountTree()
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: IAccountGetLong[]) => {
        this.accountTree = data;
        this.accountTree.forEach((item) => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      });
  }

  mapOfExpandedData: { [id: string]: TreeNodeInterface[] } = {};

  collapse(
    array: TreeNodeInterface[],
    data: TreeNodeInterface,
    $event: boolean,
  ): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach((d: IAccountGetShort) => {
          const target = array.find((a) => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({
            ...node.children[i],
            level: node.level! + 1,
            expand: false,
            parent: node,
          });
        }
      }
    }

    return array;
  }

  visitNode(
    node: TreeNodeInterface,
    hashMap: { [id: string]: boolean },
    array: TreeNodeInterface[],
  ): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  constructor(
    private accountsService: AccountsService,
    private shared: ApiService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.showAccountTree();
    this.title.setTitle('Accounts');
  }
}
