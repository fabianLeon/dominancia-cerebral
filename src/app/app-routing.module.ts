import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: 'chart', component: ChartComponent, pathMatch: 'full' },
      { path: 'test', component: TestComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'test', pathMatch: 'full' },
  ],
}];

const routerOptions: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
