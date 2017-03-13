import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-users',
  templateUrl: '../templates/users.component.html',
  styleUrls: ['../css/users.component.css']
})

export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private modal: Modal) {

    overlay.defaultViewContainer = vcRef;
  }

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedUser.id]);
  }

  newUser(): void {
    this.modal.confirm()
        .size('sm')
        .showClose(false)
        .title('Neue Person')
        .body(`test`)
        .open();
  }
}
