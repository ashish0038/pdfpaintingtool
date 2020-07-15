import { Component, OnInit } from '@angular/core';
import { NavigationMenu } from 'src/app/models/navigation-menu';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menu: Array<NavigationMenu>;
  constructor() { }

  someMethod(event: any) {
    if (event.keyCode == 13 || event.keyCode == 9) {
      setTimeout(function () {
        const elementList = document.querySelectorAll('.dropdown-menu');
        for (var i = 0; i < elementList.length; i++) {
          const eleHasClass = elementList[i].classList.value;
          if (eleHasClass == 'dropdown-menu show') {
            elementList[i].setAttribute("aria-hidden", "false");
          } else {
            elementList[i].setAttribute("aria-hidden", "true");
          }
        }
      }, 100);
    }
  }

  ngOnInit() {
    this.menu = new Array<NavigationMenu>();
    this.menu.push({
      label: '',
      icon: 'Documents',
      link: '#/home',
    });
  }

}
