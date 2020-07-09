const template = document.createElement('template');

template.innerHTML = `
  <style>
  .container {
    padding: 8px;
  }

  button {
    display: block;
    overflow: hidden;
    position: relative;
    padding: 0 16px;
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    outline: none;

    width: 100%;
    height: 40px;

    box-sizing: border-box;
    border: 1px solid #a1a1a1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
    color: #363636;
    cursor: pointer;
  }
  </style>

  <div class="container">
  <button>Label</button>
  </div>
`;

class SaySomething extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector('h2');
    this.$span = this._shadowRoot.querySelector('span');
  }

  connectedCallback() {
    if(!this.hasAttribute('color')) {
      this.setAttribute('color', 'orange');
    }

    if(!this.hasAttribute('text')) {
      this.setAttribute('text', '');
    }

    this._render();
  }

  static get observedAttributes() {
    return ['color', 'text'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'color':
        this._color = newVal;
        break;
      case 'text':
        this._text = newVal;
        break;
    };

    this._render();
  }

  _render() {
    this.$headline.style.color = this._color;
    this.$span.innerHTML = this._text;
  }
}

window.customElements.define('say-something', SaySomething);
