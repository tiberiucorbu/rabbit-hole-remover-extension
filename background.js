import { scriptMapping } from './script-mapping.js';


async function isFeatureEnabled(feature, enabledFeatures) {
  !!enabledFeatures.find(item => item === feature.name);
}

chrome.runtime.onInstalled.addListener(async () => {
  const enabledRules = await chrome.declarativeNetRequest.getEnabledRulesets();
  console.log('enabled rulesets :', enabledRules, enabledRules.map(item => item.ruleId));
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: enabledRules.map(item => item.id)
  });

  const dynamicRules = await chrome.declarativeNetRequest.getDynamicRules();
  console.log('dynamic rulesets :', dynamicRules);
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: dynamicRules.map(item => item.id)
  });


  const sessionRules = await chrome.declarativeNetRequest.getSessionRules();
  console.log('session rulesets :', sessionRules);
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: sessionRules.map(item => item.id)
  })



})

chrome.webNavigation.onCommitted.addListener(
  async (detail) => {
    const entry = scriptMapping
      .find((mapping) =>
        new RegExp(mapping.urlTest).test(detail.url)
      );
    if (entry) {


      await chrome.action.setIcon({ path: "icons/g1231-red-128.png", tabId: detail.tabId });
      const customerSettings = await chrome.storage.sync.get([entry.name]);
      const enabledFeatures = customerSettings.enabledFeatures || entry.defaultSettings.enabledFeatures;
      console.log(`Enabled features for the url ${detail.url} ${enabledFeatures}`, entry.features);
      let changesToApply = entry.features.reduce((acc, feature) => {
        if (isFeatureEnabled(feature, enabledFeatures)) {
          if (feature.blockRequests) {
            acc.enableBlockedRequests.push(...feature.blockRequests)
          }
          if (feature.overwriteRequestHeaders) {
            acc.overwriteRequestHeaders.push(...feature.overwriteRequestHeaders);
          }
          if (feature.css) {
            acc.insertStyles.push(...feature.css)
          }
          if (feature.func) {
            acc.executeFunction.push(feature.func)
          }
        } else {
          if (feature.blockRequests) {
            acc.disableBlockedRequest.push(...feature.blockRequests)
          }
        }
        return acc;
      }, { executeFunction: [], disableBlockedRequest: [], enableBlockedRequests: [], insertStyles: [], overwriteRequestHeaders: [] });


      if (changesToApply) {
        const addRules = [
          ...changesToApply.enableBlockedRequests.map(entry => {
            return {
              id: entry.ruleId,
              priority: 1,
              action: {
                type: 'block'
              },
              condition: {
                urlFilter: entry.pattern
              }
            }
          }), ...changesToApply.overwriteRequestHeaders.map(entry => {
            return {
              id: entry.ruleId,
              priority: 1,
              action: {

              },
              condition: {
                urlFilter: entry.pattern
              }
            }
          })];



        const removeRuleIds = [...changesToApply.disableBlockedRequest.map((entry) => entry.ruleId), ...changesToApply.enableBlockedRequests.map(entry => entry.ruleId), ...changesToApply.overwriteRequestHeaders.map(entry => entry.ruleId)];
        
        console.log('changes to apply', changesToApply)

        if (addRules.length || removeRules.length) {
          const result = await chrome.declarativeNetRequest.updateSessionRules({
            addRules,
            removeRuleIds
          });
          
          const enabledRules = await chrome.declarativeNetRequest.getSessionRules();
          console.log('enabled network session rules:', enabledRules);

        }

        if (changesToApply.executeFunction.length) {
          for (const func of changesToApply.executeFunction) {
            await chrome.scripting.executeScript({
              func: func,
              target: { tabId: detail.tabId },
              args: ['hello'],
            })
          }
        }
        if (changesToApply.insertStyles.length) {
          await chrome.scripting.insertCSS({ files: changesToApply.insertStyles, target: { tabId: detail.tabId } })
        }
      }
      // chrome.action.setIcon({ path: "icons/g1231-red-128.png", tabId: a.tabId });
      // console.log('mapping found applying rules', entry)
      // entry.blockRequests.forEach((urlPattern, idx) => {
      //   
      // })
      ;
    }
  });


// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
//   (a, b, c, d) => {
//     console.log('declarativeNetRequest debug', a, b, c, d)
//   }
// )