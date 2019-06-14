import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SettingsService } from './settings.service';
import { HttpService } from './http.service';
import { PageService } from './page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-sites';

  constructor(public settings: SettingsService,
    public httpService: HttpService,
    public pageService: PageService,
    private router: Router) {}

  ngOnInit(): void {
    this.settings.retrieveSettings();
    if (this.settings.backendBaseUrl) {
      this.httpService.fetchToken();
      this.pageService.fetchPages();
      this.httpService.fetchCurrentUserId();
    }
    else {
      this.router.navigate(['settings']); // Redirect
    }
  }

  exportData(): void {
    alert(JSON.stringify(this.pageService.getPages()));
  }
}
