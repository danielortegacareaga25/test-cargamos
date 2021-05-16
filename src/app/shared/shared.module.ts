import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardComponent, NavBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardComponent, NavBarComponent],
  providers: [],
})
export class SharedModule { }
