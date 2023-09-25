import './main.js'
import {getSettings} from "./getSettings.js";
import {loadItemSettings} from "./loadItemSettings.js";

// (function() {
//     console.log('popout');
//     if (window.hasRun) {
//         return;
//     }
//     window.hasRun = true;
//     console.log(typeof browser);
//     // browser.runtime.onMessage.addListener(notify);
//     // function notify(message){
//     //     alert(message.record);
//     // }
// })();

async function saveFeatureOptions(item, feature, options) {
    let savedItem = await loadItemSettings(item);
    if (!savedItem) {
        savedItem = {item, features: [{name: feature, ...options}]}
    } else {
        savedItem.features = savedItem.features || [];
        let savedFeature = savedItem.features.find((savedFeature) => savedFeature.name === feature);
        if (savedFeature) {
            Object.assign(savedFeature, options);
        } else {
            savedItem.features.push({name: feature, ...options})
        }
    }

    const storeObj = {};
    storeObj[item] = JSON.stringify(savedItem)

    await chrome.storage.sync.set(storeObj);


    // in case of the netrules they need to be added or removed
    const enabledRules = await chrome.declarativeNetRequest.getEnabledRulesets();
}

const checkboxChangeListener = async (e) => {
    const item = e.currentTarget.getAttribute('item');
    const feature = e.currentTarget.value;
    await saveFeatureOptions(item, feature, {enabled: e.currentTarget.checked});
    console.log('Featured enabled, refresh the pages to apply the changes')
};
(async () => {
    console.log('sending message');
    const settings = await getSettings();
    // do something with response here, not outside the function
    const fragment = document.createDocumentFragment();
    settings.map(item => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerText = item.name;
        div.appendChild(h2);

        const ul = document.createElement('ul');
        div.appendChild(ul)
        item.features.map(feature => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('value', feature.name);
            checkbox.setAttribute('item', item.name);
            checkbox.addEventListener('change', checkboxChangeListener)
            if (feature.enabled)
                checkbox.setAttribute('checked', '');


            label.innerText = feature.name;
            label.prepend(checkbox);
            li.append(label);
            return li;
        }).forEach(li => ul.appendChild(li));
        // ul.append(features);
        return div;
    }).forEach(div => fragment.appendChild(div));

    document.body.appendChild(fragment);
})();

