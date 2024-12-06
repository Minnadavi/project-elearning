import { Component } from '@angular/core';
import { HomeComponent } from "../../../components/home/home.component";
import { ContactComponent } from "../../../components/contact/contact.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { AboutUsComponent } from "../../../components/about-us/about-us.component";

@Component({
  selector: 'app-apphome',
  standalone: true,
  imports: [HomeComponent, ContactComponent, FooterComponent, AboutUsComponent],
  templateUrl: './apphome.component.html',
  styleUrl: './apphome.component.scss'
})
export class ApphomeComponent {

}
