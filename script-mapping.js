// import { applyAmazonChanges } from "./websites/amazon/disable-suggestions.js";

function hideAmazonAds() {

}

let ruleId = 1;

export const scriptMapping = [
	{
		urlTest: 'aliexpress\.com',
		name: 'Ali Express',
		features: [
			{
				name: 'Disable Homepage Feed',
				blockRequests: [
					{ pattern: 'http*aliexpress.com/api/data_homepage.do*', ruleId: ruleId++ },
					{ pattern: 'http*aliexpress.com/api/load_region_path.htm*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Recomantations',
				blockRequests: [
					{ pattern: 'http*acs.aliexpress.com/h5/mtop.relationrecommend.aliexpressrecommend.recommend/1.0/*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Pop Player',
				blockRequests: [
					{ pattern: 'http*acs.aliexpress.com/h5/mtop.aliexpress.usertouch.poplayer.get/2.0/*', ruleId: ruleId++ }
				]
			}
			// {
			// 	name: 'Open Products in the same TAB',
			// 	func: async () => {
			// 		console.log('asd')

			// 		function ready() {
			// 			return new Promise((res) => {
			// 				if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
			// 					res();
			// 				} else {
			// 					document.addEventListener('DOMContentLoaded', res);
			// 				}
			// 			});
			// 		}
			// 		await ready();

			// 		// Create an observer instance linked to the callback function
			// 		const observer = new MutationObserver(	// Callback function to execute when mutations are observed
			// 			(mutationList, observer) => {
			// 				for (const mutation of mutationList) {
			// 					for (const node of mutation.addedNodes) {

			// 						if (node instanceof HTMLElement) {

			// 							if (node.matches(`a[target]`)) {
			// 								console.log(node)
			// 								node.removeAttribute('target');
			// 							}
			// 						}
			// 					}
			// 				}
			// 			});
			// 		// Start observing the target node for configured mutations
			// 		observer.observe(document.body, { attributes: true, childList: true, subtree: true });

			// 		Array.from(document.querySelectorAll('a[target]'))
			// 			.forEach(link => {
			// 				console.log(link);
			// 				link.removeAttribute('target')
			// 			});
			// 	}
			// }

		],
		defaultSettings: { enabledFeatures: ['Disable Pop Player', 'Disable Homepage Feed', 'Disable Recomantations', 'Open Products in the same TAB'] },
	},
	{

		urlTest: 'https://.*.amazon.*',
		name: 'Amazon',
		features: [
			{
				name: 'Disable Search suggestions',
				blockRequests: [
					{ pattern: 'https*completion.amazon.*/suggestions', ruleId: ruleId++ }

				]
			}, {
				name: 'Disable History and Recomantations',
				blockRequests: [
					{ pattern: 'https://www.amazon.*/hz/rhf', ruleId: ruleId++ }

				],

			},
			{
				name: 'Disable Carousels',
				blockRequests: [
					{ pattern: 'http*www.amazon.*/acp/*/getCarouselItems*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Tracking',
				blockRequests: [
					{ pattern: 'http*fls-eu.amazon*/1/*/OE/', ruleId: ruleId++ },
					{ pattern: 'https://unagi.amazon.*/1/events/com.amazon.csm.csa.prod', ruleId: ruleId++ },
					{ pattern: 'https://images-eu.ssl-images-amazon.com/images/*/metrics.jpg', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Loging',
				blockRequests: [
					{ pattern: 'http*fls-eu.amazon*/1/*/OE/', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable IFrames',
				blockRequests: [
					{ pattern: 'https://images-eu.ssl-images-amazon.com/*.html', ruleId: ruleId++ }

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
		defaultSettings: { enabledFeatures: ['Hide Main Navigation', 'Hide Home Feed', 'Hide ads', 'Disable Search suggestions', 'Disable Carousels', 'Disable Tracking', 'Hide ads'] },
		// script: applyAmazonChanges,

		// blockRequests: [
		// 'http*://www.amazon.*/hz/rhf*'
		// ]
	},

	{
		urlTest: 'https://.*.payback.de\/?.*',
		name: 'Payback DE',
		features: [
			{
				name: 'Disable Homepage Feed',
				blockRequests: [
					{ pattern: 'https://www.payback.de/ajax/feed*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Ads',
				blockRequests: [
					{ pattern: 'https://is.payback.de/js/srp.js*', ruleId: ruleId++ },
					{ pattern: 'https://*.adition.com/*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Tracking',
				blockRequests: [
					{ pattern: 'https://smetrics.payback.de/*', ruleId: ruleId++ }
				]
			},
			{
				name: 'Disable Shop Recomantations',
				blockRequests: [
					{ pattern: 'https://www.payback.de/ajax/recommendations*', ruleId: ruleId++ }
				]
			}
			//,
			// {
			// 	name: 'Don\'t redirect to mobile - Fake User Agent',
			// 	overwriteRequestHeaders: [{
			// 		pattern: 'http://payback.de*',
			// 		headers: {
			// 			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
			// 		},
			// 		ruleId: ruleId++
			// 	}]


			// }
		],

		//Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36
		//Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36
		defaultSettings: { enabledFeatures: ['Disable Homepage Feed', 'Disable Ads', 'Disable Tracking'] },
		// script: applyAmazonChanges,

		// blockRequests: [
		// 'http*://www.amazon.*/hz/rhf*'
		// ]
	},
	// {
	// 	urlTest: 'https://.*.youtube\.com.*',
	// 	script: 'websites/amazon.js',
	// 	blockRequests: [
	// 		'https://www.google.de/pagead/*',
	// 		'https://www.youtube.com/youtubei/v1/browse*',
	// 		'https://www.youtube.com/youtubei/v1/log_event*'

	// 	],
	// 	redirects: [
	// 		{
	// 			from: 'https://www.youtube.com/',
	// 			to: 'https://www.youtube.com/feed/library'
	// 		}
	// 	],
	// 	ruleIndex: 30

	// }
]



