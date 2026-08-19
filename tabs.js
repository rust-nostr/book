(function () {
    'use strict';

    const changeEvent = 'mdbook-category-changed';

    customElements.define('custom-tabs', class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = `
                <style>
                    :host {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        border: 1px solid var(--mdc-theme-divider);
                        border-radius: 4px;
                    }

                    #tabs {
                        display: flex;
                        border-bottom: 1px solid var(--mdc-theme-divider);
                        background-color: var(--mdc-theme-primary);
                        overflow-x: auto;
                        position: relative;
                    }

                    #tabs ::slotted([slot="title"]) {
                        color: var(--mdc-theme-text-primary);
                        padding: 12px 16px;
                        text-align: center;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        cursor: pointer;
                        border-bottom: 2px solid transparent;
                        transition: border-bottom-color 0.3s, background-color 0.3s;
                        margin: 0;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    #tabs ::slotted([aria-selected="true"]),
                    #tabs ::slotted([slot="title"]:hover) {
                        color: var(--mdc-theme-primary);
                        background-color: var(--mdc-theme-background);
                        border-bottom-color: var(--mdc-theme-primary);
                    }

                    #tabs ::slotted([slot="title"]:focus-visible) {
                        outline: 2px solid currentColor;
                        outline-offset: -2px;
                    }

                    #panels {
                        padding: 0;
                    }

                    #panels ::slotted([hidden]) {
                        display: none;
                    }

                    @media (max-width: 600px) {
                        #tabs ::slotted([slot="title"]) {
                            flex-grow: 1;
                            flex-shrink: 0;
                        }
                    }
                </style>
                <div id="tabs" role="tablist" aria-label="Code language">
                    <slot id="tabs-slot" name="title"></slot>
                </div>
                <div id="panels">
                    <slot id="panels-slot"></slot>
                </div>
            `;
        }

        connectedCallback() {
            const tabsSlot = this.shadowRoot.querySelector('#tabs-slot');
            const panelsSlot = this.shadowRoot.querySelector('#panels-slot');
            this.tabs = tabsSlot.assignedElements({ flatten: true });
            this.panels = panelsSlot.assignedElements({ flatten: true });

            if (this.tabs.length !== this.panels.length || this.tabs.length === 0) {
                console.error('custom-tabs requires one panel for every title');
                return;
            }

            this.tabs.forEach((tab, index) => {
                const id = `tab-${this._instanceId()}-${index}`;
                const panelId = `panel-${this._instanceId()}-${index}`;
                tab.id = id;
                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-controls', panelId);
                this.panels[index].id = panelId;
                this.panels[index].setAttribute('role', 'tabpanel');
                this.panels[index].setAttribute('aria-labelledby', id);
            });

            this._onClick = this._handleClick.bind(this);
            this._onKeydown = this._handleKeydown.bind(this);
            this._onCategoryChange = this._handleCategoryChange.bind(this);
            tabsSlot.addEventListener('click', this._onClick);
            tabsSlot.addEventListener('keydown', this._onKeydown);
            document.addEventListener(changeEvent, this._onCategoryChange);

            const explicit = this.tabs.findIndex((tab) => tab.hasAttribute('selected'));
            const stored = this._storedLabel();
            const storedIndex = this.tabs.findIndex((tab) => this._label(tab) === stored);
            this._select(explicit >= 0 ? explicit : storedIndex >= 0 ? storedIndex : 0, false);
        }

        disconnectedCallback() {
            const tabsSlot = this.shadowRoot.querySelector('#tabs-slot');
            tabsSlot.removeEventListener('click', this._onClick);
            tabsSlot.removeEventListener('keydown', this._onKeydown);
            document.removeEventListener(changeEvent, this._onCategoryChange);
        }

        _instanceId() {
            if (!this._id) {
                this._id = Math.random().toString(36).slice(2);
            }
            return this._id;
        }

        _label(tab) {
            return tab.textContent.trim();
        }

        _storedLabel() {
            const category = this.getAttribute('category');
            if (!category) return null;
            try {
                return localStorage.getItem(`mdbook-tabs-${category}`);
            } catch (_) {
                return null;
            }
        }

        _handleClick(event) {
            const index = this.tabs.indexOf(event.target);
            if (index >= 0) {
                this._select(index, true);
                this.tabs[index].focus();
            }
        }

        _handleKeydown(event) {
            const current = this.tabs.indexOf(event.target);
            if (current < 0) return;

            let next = current;
            if (event.key === 'ArrowRight') next = (current + 1) % this.tabs.length;
            else if (event.key === 'ArrowLeft') next = (current - 1 + this.tabs.length) % this.tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = this.tabs.length - 1;
            else return;

            event.preventDefault();
            this._select(next, true);
            this.tabs[next].focus();
        }

        _handleCategoryChange(event) {
            if (event.detail.category !== this.getAttribute('category')) return;
            const index = this.tabs.findIndex((tab) => this._label(tab) === event.detail.label);
            if (index >= 0) this._select(index, false);
        }

        _select(index, propagate) {
            this.tabs.forEach((tab, tabIndex) => {
                const selected = tabIndex === index;
                tab.tabIndex = selected ? 0 : -1;
                tab.setAttribute('aria-selected', String(selected));
                this.panels[tabIndex].hidden = !selected;
            });

            const category = this.getAttribute('category');
            const label = this._label(this.tabs[index]);
            this.setAttribute('selected', label);

            if (category) {
                try {
                    localStorage.setItem(`mdbook-tabs-${category}`, label);
                } catch (_) {
                    // Storage can be unavailable in privacy-restricted contexts.
                }
            }

            if (propagate) {
                document.dispatchEvent(new CustomEvent(changeEvent, { detail: { category, label } }));
            }
        }
    });
})();
