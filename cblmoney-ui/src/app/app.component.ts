import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastyConfig: ToastyConfig,
    private router: Router) {

    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.showClose = true;
    this.toastyConfig.position = 'bottom-right';
    this.toastyConfig.timeout = 5000;
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }
}
