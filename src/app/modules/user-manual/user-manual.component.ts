import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-user-manual',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './user-manual.component.html',
  styleUrl: './user-manual.component.scss'
})
export class UserManualComponent {
  public copyrightYear: number = new Date().getFullYear();
}
