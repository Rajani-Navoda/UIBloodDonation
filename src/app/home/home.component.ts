import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import anime from 'animejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let textWrapper = this.document.querySelector('.c2 .letters') as HTMLElement | null;
      
      if (textWrapper && textWrapper.textContent) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
      
        anime.timeline({loop: true})
          .add({
            targets: '.c2 .line',
            scaleY: [0,1],
            opacity: [0.5,1],
            easing: "easeOutExpo",
            duration: 700
          })
          .add({
            targets: ['.c2 .line', '.c2 .letter'],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 600,
            delay: (el, i) => 34 * (i+1)
          }, '-=700')  // Start this animation 700ms before the previous one ends
          .add({
            targets: '.c2 .line',
            translateX: [0, textWrapper.getBoundingClientRect().width + 10],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100
          }, '-=1000')  // Start this animation 1000ms before the previous one ends
          .add({
            targets: '.c2',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 3000
          });
      }
    }
  }
}
