let ruleId = 1;

export const scriptMapping = [
    {
        urlTest: 'aliexpress\.com',
        name: 'Ali Express',
        features: [
            {
                name: 'Disable Homepage Feed',
                enabled: true,
                blockRequests: [
                    {pattern: 'http*aliexpress.com/api/data_homepage.do*', ruleId: ruleId++},
                    {pattern: 'http*aliexpress.com/api/load_region_path.htm*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Recommendations',
                enabled: true,
                blockRequests: [
                    {
                        pattern: 'http*acs.aliexpress.com/h5/mtop.relationrecommend.aliexpressrecommend.recommend/1.0/*',
                        ruleId: ruleId++
                    }
                ]
            },
            {
                name: 'Disable Pop Player',
                enabled: true,
                blockRequests: [
                    {
                        pattern: 'http*acs.aliexpress.com/h5/mtop.aliexpress.usertouch.poplayer.get/2.0/*',
                        ruleId: ruleId++
                    }
                ]
            },
            {
                name: 'Open Products in the same TAB',
                enabled: true,
                func: async () => {
                    console.log('asd')

                    function ready() {
                        return new Promise((res) => {
                            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                                res();
                            } else {
                                document.addEventListener('DOMContentLoaded', res);
                            }
                        });
                    }

                    await ready();

                    // Create an observer instance linked to the callback function
                    const observer = new MutationObserver(	// Callback function to execute when mutations are observed
                        (mutationList, observer) => {
                            for (const mutation of mutationList) {
                                for (const node of mutation.addedNodes) {

                                    if (node instanceof HTMLElement) {

                                        if (node.matches(`a[target]`)) {
                                            console.log(node)
                                            node.removeAttribute('target');
                                        }
                                    }
                                }
                            }
                        });
                    // Start observing the target node for configured mutations
                    observer.observe(document.body, {attributes: true, childList: true, subtree: true});

                    Array.from(document.querySelectorAll('a[target]'))
                        .forEach(link => {
                            console.log(link);
                            link.removeAttribute('target')
                        });
                }
            }

        ],
    },
    {

        urlTest: 'https://.*.amazon.*',
        name: 'Amazon',
        features: [
            {
                name: 'Disable Search suggestions',
                enabled: true,
                blockRequests: [
                    {pattern: 'https*completion.amazon.*/suggestions', ruleId: ruleId++}

                ]
            }, {
                name: 'Disable History and Recommendations',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://www.amazon.*/hz/rhf', ruleId: ruleId++}

                ],

            },
            {
                name: 'Disable Carousels',
                enabled: true,
                blockRequests: [
                    {pattern: 'http*www.amazon.*/acp/*/getCarouselItems*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Tracking',
                enabled: true,
                blockRequests: [
                    {pattern: 'http*fls-eu.amazon*/1/*/OE/', ruleId: ruleId++},
                    {pattern: 'https://unagi.amazon.*/1/events/com.amazon.csm.csa.prod', ruleId: ruleId++},
                    {pattern: 'https://images-eu.ssl-images-amazon.com/images/*/metrics.jpg', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Logging',
                enabled: true,
                blockRequests: [
                    {pattern: 'http*fls-eu.amazon*/1/*/OE/', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable IFrames',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://images-eu.ssl-images-amazon.com/*.html', ruleId: ruleId++}

                ],
                css: ['./websites/amazon/hideIframes.css']
            },
            {
                name: 'Hide ads',
                css: ['./websites/amazon/hideAdds.css']
            },
            {
                name: 'Hide Home Feed',
                css: ['./websites/amazon/hideHomeFeed.css']
            },
            {
                name: 'Hide Main Navigation',
                css: ['./websites/amazon/hideMainNavBar.css']
            }
        ],
    },

    {
        urlTest: 'https://.*.payback.de\/?.*',
        name: 'Payback DE',
        features: [
            {
                name: 'Disable Homepage Feed',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://www.payback.de/ajax/feed*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Ads',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://is.payback.de/js/srp.js*', ruleId: ruleId++},
                    {pattern: 'https://*.adition.com/*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Tracking',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://smetrics.payback.de/*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Disable Shop Recomantations',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://www.payback.de/ajax/recommendations*', ruleId: ruleId++}
                ]
            }
        ],
    },
    {
        name: 'Youtube',
        urlTest: 'https://.*.youtube\.com.*',

        features: [
            {
                name: 'Disable Ads',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://www.google.de/pagead/*', ruleId: ruleId++},
                ]
            },
            {
                name: 'Disable Tracking',
                enabled: true,
                blockRequests: [
                    {pattern: 'https://www.youtube.com/youtubei/v1/log_event*', ruleId: ruleId++}
                ]
            },
            {
                name: 'Show your library instead of the feed',
                enabled: true,
                redirects: [
                    {
                        from: 'https://www.youtube.com/',
                        to: 'https://www.youtube.com/feed/library'
                    }
                ],
            }, {
                name: 'Disable main feed',
                enabled: true,
                func: async () => {
                    function ready() {
                        return new Promise((res) => {
                            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                                res();
                            } else {
                                document.addEventListener('DOMContentLoaded', res);
                            }
                        });
                    }

                    await ready();
                    let url = new URL(window.location.href);
                    if (url.pathname !== '/watch') {
                        console.log('removing primary')
                        const primary = document.getElementById('primary');
                        primary.parentElement.removeChild(primary);
                    }


                }
            }, {
                name: 'Disable EndScreen feed',
                enabled: true,
                css: [`
                .html5-endscreen {
                    display: none !important;
                }
                `]
            }, {
                name: 'Disable play next feed',
                enabled: true,
                func: async () => {
                    function ready() {
                        return new Promise((res) => {
                            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                                res();
                            } else {
                                document.addEventListener('DOMContentLoaded', res);
                            }
                        });
                    }

                    await ready();
                    let url = new URL(window.location.href);

                    function remove(selector) {
                        const element = document.querySelectorAll(selector);
                        for (const el of element) {
                            el.parentElement.removeChild(el);
                        }
                    }

                    if (url.pathname === '/watch') {
                        console.log('removing primary')
                        remove('.ytd-watch-next-secondary-results-renderer');
                        remove('.ytd-reel-shelf-renderer');

                    }


                }
            }
        ],
        ruleIndex: 30
    }
]



