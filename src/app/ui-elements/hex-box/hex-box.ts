import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, input, viewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-hex-box',
  imports: [CommonModule],
  templateUrl: './hex-box.html',
  styleUrl: './hex-box.scss'
})
export class HexBox implements OnInit {
  svg = viewChild<ElementRef>('svg')
  polygon = viewChild<ElementRef>('polygon')
  hexBoxWrapper = viewChild<ElementRef>('hexBoxWrapper')
  borderColour = input("aqua")
  borderWidth = input("2")
  backgroundColour = input("none")
  dentSize = input("10")
  cutValue = computed(() => Number(this.dentSize()))
  strokeWidth = computed(()=> Number(this.borderWidth()))

  ngOnInit() {
    this.initSvgConfig()
  }

  initSvgConfig() {
    const wrapper = this.hexBoxWrapper()?.nativeElement as HTMLDivElement
    const parent = wrapper.parentElement as HTMLElement
    const config = parent.ownerDocument.defaultView?.getComputedStyle(parent)
    const [width = 1, height = 1] = [config?.width.replace("px", ""), config?.height.replace("px", "")]
    const svg = this.svg()?.nativeElement as SVGElement
    svg.setAttribute("width", String(width))
    svg.setAttribute("height", String(height))
    this.initPolygonStyles(Number(width), Number(height))
  }

  initPolygonStyles(svgWidth: number, svgHeight: number) {
    const polygon = this.polygon()?.nativeElement as SVGPolygonElement
    polygon.style.stroke = String(this.borderColour());
    polygon.style.strokeWidth = String(this.strokeWidth());
    polygon.style.fill = this.backgroundColour()
    const midLine = this.strokeWidth() / 2
    const newPoints = [
      midLine + "," + this.cutValue(),
      this.cutValue() + "," + midLine,
      `${svgWidth - this.cutValue()},${midLine}`,
      `${svgWidth - midLine},${this.cutValue()}`,
      `${svgWidth - midLine},${svgHeight - this.cutValue()}`,
      `${svgWidth - this.cutValue()},${svgHeight - midLine}`,
      `${this.cutValue()},${svgHeight - midLine}`,
      `${midLine},${svgHeight - this.cutValue()}`
    ].join(" ")
    polygon.setAttribute("points", newPoints)
  }

}
