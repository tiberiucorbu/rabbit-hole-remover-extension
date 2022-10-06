

(async () => {

    const elementHandlers = {
        '#search-key': (element) => {
            element.setAttribute('placeholder', 'Search');
        },
        '.advertise-main': (element) => {
            element.style.visibility = 'hidden';
        },
        'div[biz_code], div[class*="global-sale-module-"], div[class*="recommend--container-"], .bottom-recommendation, .top-banner-container, .home-firstscreen-main, .p4p': (element) => {
            console.log(element);
            element.style.display = 'none';
        },
        'a[target="_blank"]': (element) => {
            element.removeAttribute('target');
        }
    }
    const selectors = Object.keys(elementHandlers);

    async function handleMutation(mutation) {
        // console.log(mutation);
        for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
                handleElement(node);
            }
        }
    }
    async function handleElement(element) {

        for (const selector of selectors) {

            if (element.matches(selector)) {
                const handle = elementHandlers[selector];
                handle(element);
            }

        }
    }

    function ready() {
        return new Promise((res) => {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                res();
            } else {
                document.addEventListener('DOMContentLoaded', res);
            }
        });
    }

    function handleInitialState() {

        for (const selector of selectors) {
            console.log(selector);
            const elements = document.querySelectorAll(selector);

            if (elements) {
                const handle = elementHandlers[selector];
                console.log(elements);
                for (const element of elements) {
                    handle(element);
                }
            }
        }
        console.log('hello');
    }

    function observeNodes() {
        const targetNode = document.body;

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                handleMutation(mutation);
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }



    await ready();
    console.log('ali prepare');

    handleInitialState();
    // Select the node that will be observed for mutations
    observeNodes();
    // observeFetch();


})();

