"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var user_service_1 = require('./user.service');
var UsersComponent = (function () {
    function UsersComponent(router, userService, overlay, vcRef, modal) {
        this.router = router;
        this.userService = userService;
        this.overlay = overlay;
        this.vcRef = vcRef;
        this.modal = modal;
        overlay.defaultViewContainer = vcRef;
    }
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UsersComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedUser.id]);
    };
    UsersComponent.prototype.newUser = function () {
        this.modal.confirm()
            .size('sm')
            .showClose(false)
            .title('Neue Person')
            .body("test")
            .open();
    };
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-users',
            templateUrl: '../templates/users.component.html',
            styleUrls: ['../css/users.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map