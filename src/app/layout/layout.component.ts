import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navItems: string[] = ['Snapshot Report', 'Some Other Nav'];

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit(): void {
  }

  public get username(){
    return this.authService.loggedInUserName;
  }

}
