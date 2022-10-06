import { scriptMapping } from './script-mapping.js';

function getSupportedBlockFeatures(tab) {
    return scriptMapping
        .find((mapping) =>
            new RegExp(mapping.urlTest).test(tab.url)
        );

}

export class WordCount extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.attachShadow({ mode: 'open' });

        // this.shadowRoot.innerHTML = Object.keys();

        // Element functionality written in here
    }

    async connectedCallback() {
        const tabs = await chrome.tabs.query({ active: true });
        for (const tab of tabs) {
            const supportedFeatures = getSupportedBlockFeatures(tab)
            // console.log(supportedFeatures);
            if (supportedFeatures) {
                const el = document.createElement('rhr-feature-toggler');
                el.features = supportedFeatures;
                this.shadowRoot.appendChild(el);
            }
        }
    }
}

customElements.define('rhr-main', WordCount);


export class FeatureToggler extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.attachShadow({ mode: 'open' });

        // this.shadowRoot.innerHTML = Object.keys();

        // Element functionality written in here
    }

    async connectedCallback() {
        console.log(this.features);

        // this.shadowRoot.appendChild()
    }
}

customElements.define('rhr-feature-toggler', FeatureToggler);