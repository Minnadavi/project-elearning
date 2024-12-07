import { Component } from '@angular/core';
import { HomeComponent } from '../../../shared/components/home/home.component';
import { ContactComponent } from '../../../shared/components/contact/contact.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AboutUsComponent } from '../../../shared/components/about-us/about-us.component';

@Component({
  selector: 'app-apphome',
  standalone: true,
  imports: [HomeComponent, ContactComponent, FooterComponent, AboutUsComponent],
  templateUrl: './apphome.component.html',
  styleUrl: './apphome.component.scss'
})
export class ApphomeComponent {

}
