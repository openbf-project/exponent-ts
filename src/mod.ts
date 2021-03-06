
import Component from "./component.js";
import { Exponent } from "./exponent.js";
import { Panel } from "./exponents/panel.js";
import { Button } from "./exponents/button.js";
import { ContextPanel } from "./exponents/contextpanel.js";
import { DualPanel } from "./exponents/dualpanel.js";
import { Grid } from "./exponents/grid.js";
import { ImagePanel } from "./exponents/imagepanel.js";
import { ListPanel } from "./exponents/listpanel.js";
import { SquarePanel } from "./exponents/squarepanel.js";
import { Knob } from "./exponents/knob.js";
import { Drawing } from "./exponents/drawing.js";
import { on, get, applyStyleClasses, clearChildren, getByClass, make, off, rect } from "./aliases.js";

export const EXPONENT_CSS_STYLES = new Component()
.make("style")
  .setId("exponent-built-in-styles")
  .setTextContent(`
  .exponent {
    flex: 1;
  }
  .exponent-panel {
    display: flex;
  }
  .exponent-dual-panel {
    display: flex;
  }
  .exponent-grid {
    display: grid;
  }
  .exponent-button {
    border: none;
    cursor: pointer;
  }
  .exponent-knob-grab {
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    cursor: grab;
  }
  .exponent-drawing {
    min-width:0;
  }
  .exponent-square-container {
  }
  .exponent-list {
    flex-wrap: wrap;
    /* overflow:hidden; */
  }
  .exponent-list>* {
    flex: 1;
  }`);

function injectEventListenAPI() {
  //TODO - implement into exponents themselves
  //harrix / hb432 implementation of event tracking
  (() => {
    const storage: Map<EventTarget, Set<[string, EventListener, EventListenerOptions]>> = new Map();
    const { addEventListener, removeEventListener } = EventTarget.prototype;
    Object.defineProperties(EventTarget.prototype, {
      eventListeners: {
        get: function () {
          return storage.has(this) ? storage.get(this) : storage.set(this, []).get(this);
        }
      },
      addEventListener: {
        value: function (...args) {
          addEventListener.call(this, ...args);
          this.eventListeners.push(new Set(args));
        }
      },
      removeEventListener: {
        value: function (...args) {
          removeEventListener.call(this, ...args);
          const listeners = this.eventListeners;
          for (const listener of listeners) {
            args.map((arg) => listener.has(arg)).includes(false) || listeners.splice(listeners.indexOf(listener), 1);
          }
        }
      }
    });
  })();
  /**example usage, remove all events for the click and hover events from all div elements
   * for (const div of [ ...document.querySelectorAll('div') ]) {
     for (const [ type, ...args ] of div.eventListeners) {
        switch (type) {
           case 'click':
           case 'hover':
              div.removeEventListener(type, ...args);
              break;
        }
     }
    }
   */
}

function runOnce() {
  injectEventListenAPI();
}

export {
  Exponent,
  Button,
  Panel,
  ContextPanel,
  DualPanel,
  Grid,
  ImagePanel,
  ListPanel,
  SquarePanel,
  Knob,
  Drawing,
  Component,
  runOnce,
  on, get, applyStyleClasses, clearChildren, getByClass, make, off, rect
};

